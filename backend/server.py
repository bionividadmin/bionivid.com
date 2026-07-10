import os
import uuid
import shutil
import logging
from datetime import datetime, timezone
from pathlib import Path
from typing import Any, Optional, List

from fastapi import FastAPI, APIRouter, HTTPException, Depends, Query, UploadFile, File, Request
from fastapi.responses import JSONResponse
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel, EmailStr, Field
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient

from auth import (
    hash_password, verify_password, create_access_token, require_admin,
)
import seed_data as seed

ROOT_DIR = Path(__file__).parent
UPLOAD_DIR = ROOT_DIR / "uploads"
UPLOAD_DIR.mkdir(exist_ok=True)
load_dotenv(ROOT_DIR / ".env")

# --------------------------------------------------------------------
# DB
# --------------------------------------------------------------------
mongo_url = os.environ["MONGO_URL"]
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ["DB_NAME"]]

# --------------------------------------------------------------------
# App
# --------------------------------------------------------------------
app = FastAPI(title="Bionivid CMS API")
api = APIRouter(prefix="/api")

logging.basicConfig(level=logging.INFO, format="%(asctime)s - %(levelname)s - %(message)s")
log = logging.getLogger("bionivid")


# --------------------------------------------------------------------
# Helpers
# --------------------------------------------------------------------
def now_iso() -> str:
    return datetime.now(timezone.utc).isoformat()


def clean(doc: dict | None) -> dict | None:
    """Remove Mongo _id so responses stay serializable."""
    if not doc:
        return doc
    doc.pop("_id", None)
    return doc


# Map public/admin resource names -> Mongo collections + default sort
RESOURCES = {
    "hero-slides":          {"col": "hero_slides",       "sort": [("order", 1)]},
    "stats":                {"col": "stats",             "sort": [("order", 1)]},
    "services":             {"col": "services",          "sort": [("order", 1)]},
    "solutions":            {"col": "solutions",         "sort": [("order", 1)]},
    "tech-platforms":       {"col": "tech_platforms",    "sort": [("order", 1)]},
    "omics-categories":     {"col": "omics_categories",  "sort": [("order", 1)]},
    "values":               {"col": "values",            "sort": [("order", 1)]},
    "leadership":           {"col": "leadership",        "sort": [("order", 1)]},
    "clients":              {"col": "clients",           "sort": [("order", 1)]},
    "testimonials":         {"col": "testimonials",      "sort": [("order", 1)]},
    "publications":         {"col": "publications",      "sort": [("year", -1)]},
    "contact-submissions":  {"col": "contact_submissions", "sort": [("created_at", -1)], "admin_only": True},
    "newsletter-subscribers": {"col": "newsletter_subscribers", "sort": [("created_at", -1)], "admin_only": True},
}


def _res(name: str) -> dict:
    if name not in RESOURCES:
        raise HTTPException(status_code=404, detail=f"Unknown resource '{name}'")
    return RESOURCES[name]


# --------------------------------------------------------------------
# Models
# --------------------------------------------------------------------
class LoginBody(BaseModel):
    email: EmailStr
    password: str


class ContactBody(BaseModel):
    name: str
    email: EmailStr
    org: Optional[str] = None
    phone: Optional[str] = None
    subject: Optional[str] = None
    message: str


class NewsletterBody(BaseModel):
    email: EmailStr
    source: Optional[str] = "footer"


# --------------------------------------------------------------------
# Startup: seed data
# --------------------------------------------------------------------
async def _seed_collection(col_name: str, items: list, key: str | None = None):
    col = db[col_name]
    if await col.count_documents({}) == 0 and items:
        docs = []
        for it in items:
            d = dict(it)
            if "id" not in d:
                d["id"] = str(uuid.uuid4())
            d.setdefault("created_at", now_iso())
            docs.append(d)
        await col.insert_many(docs)
        log.info(f"Seeded {len(docs)} into {col_name}")


async def _seed_singleton(col_name: str, doc: dict):
    col = db[col_name]
    existing = await col.find_one({"id": doc["id"]})
    if not existing:
        d = dict(doc)
        d.setdefault("created_at", now_iso())
        await col.insert_one(d)
        log.info(f"Seeded singleton {col_name}")
    else:
        # Add any missing fields from seed (non-destructive migration)
        missing = {k: v for k, v in doc.items() if k not in existing}
        if missing:
            await col.update_one({"id": doc["id"]}, {"$set": missing})
            log.info(f"Added {list(missing.keys())} to {col_name}")


async def _ensure_admin():
    col = db["admins"]
    if await col.count_documents({}) == 0:
        doc = {
            "id": str(uuid.uuid4()),
            "email": "admin@bionivid.com",
            "name": "Bionivid Admin",
            "password_hash": hash_password("Admin@1234"),
            "role": "admin",
            "created_at": now_iso(),
        }
        await col.insert_one(doc)
        log.info("Seeded default admin: admin@bionivid.com / Admin@1234")


@app.on_event("startup")
async def on_startup():
    try:
        await _ensure_admin()
        await _seed_singleton("site_settings", seed.SITE)
        await _seed_singleton("about_galleries", seed.ABOUT_GALLERIES)
        await _seed_singleton("home_about", seed.HOME_ABOUT)
        await _seed_singleton("about_section", seed.ABOUT_SECTION)
        await _seed_collection("hero_slides", seed.HERO_SLIDES)
        await _seed_collection("stats", seed.STATS)
        await _seed_collection("services", seed.SERVICES)
        await _seed_collection("solutions", seed.SOLUTIONS)
        await _seed_collection("tech_platforms", seed.TECH_PLATFORMS)
        await _seed_collection("omics_categories", seed.OMICS_CATEGORIES)
        await _seed_collection("values", seed.VALUES)
        await _seed_collection("leadership", seed.LEADERSHIP)
        await _seed_collection("clients", seed.CLIENTS)
        await _seed_collection("testimonials", seed.TESTIMONIALS)
        await _seed_collection("publications", seed.PUBLICATIONS)
        # Publications need a unique_id, add if missing? Only add id if missing (handled).
        log.info("Seed complete.")
    except Exception as e:
        log.exception(f"Seed failed: {e}")


@app.on_event("shutdown")
async def on_shutdown():
    client.close()


# --------------------------------------------------------------------
# Health
# --------------------------------------------------------------------
@api.get("/")
async def root():
    return {"service": "Bionivid CMS", "status": "ok"}


# --------------------------------------------------------------------
# Auth
# --------------------------------------------------------------------
@api.post("/auth/login")
async def login(body: LoginBody):
    admin = await db["admins"].find_one({"email": body.email.lower()})
    if not admin or not verify_password(body.password, admin["password_hash"]):
        raise HTTPException(status_code=401, detail="Invalid email or password")
    token = create_access_token(sub=admin["id"], extra={"role": "admin", "email": admin["email"]})
    return {
        "access_token": token,
        "token_type": "bearer",
        "admin": {"id": admin["id"], "email": admin["email"], "name": admin.get("name")},
    }


@api.get("/auth/me")
async def me(payload=Depends(require_admin)):
    admin = await db["admins"].find_one({"id": payload["sub"]})
    if not admin:
        raise HTTPException(status_code=404, detail="Admin not found")
    return {"id": admin["id"], "email": admin["email"], "name": admin.get("name")}


# --------------------------------------------------------------------
# File uploads (admin)
# --------------------------------------------------------------------
ALLOWED_EXTS = {".png", ".jpg", ".jpeg", ".webp", ".gif", ".svg", ".pdf"}
MAX_SIZE = 8 * 1024 * 1024  # 8 MB


@api.post("/admin/upload", dependencies=[Depends(require_admin)])
async def upload_file(request: Request, file: UploadFile = File(...)):
    ext = Path(file.filename or "").suffix.lower()
    if ext not in ALLOWED_EXTS:
        raise HTTPException(status_code=400, detail=f"Unsupported file type: {ext}")
    fname = f"{uuid.uuid4().hex}{ext}"
    dest = UPLOAD_DIR / fname
    total = 0
    with open(dest, "wb") as f:
        while True:
            chunk = await file.read(1024 * 512)
            if not chunk:
                break
            total += len(chunk)
            if total > MAX_SIZE:
                f.close()
                dest.unlink(missing_ok=True)
                raise HTTPException(status_code=413, detail="File too large (max 8 MB)")
            f.write(chunk)
    # Return relative URL — frontend prepends REACT_APP_BACKEND_URL.
    return {"url": f"/api/uploads/{fname}", "filename": fname, "size": total}


# --------------------------------------------------------------------
# Public content (GET only)
# --------------------------------------------------------------------
@api.get("/content/site")
async def get_site():
    doc = await db["site_settings"].find_one({"id": "main"})
    return clean(doc) or {}


@api.get("/content/about-galleries")
async def get_about_galleries():
    doc = await db["about_galleries"].find_one({"id": "main"})
    return clean(doc) or {}


@api.get("/content/home-about")
async def get_home_about():
    doc = await db["home_about"].find_one({"id": "main"})
    return clean(doc) or {}


@api.get("/content/about-section")
async def get_about_section():
    doc = await db["about_section"].find_one({"id": "main"})
    return clean(doc) or {}


@api.get("/content/{resource}")
async def list_public(resource: str, q: Optional[str] = None):
    meta = _res(resource)
    if meta.get("admin_only"):
        raise HTTPException(status_code=404, detail="Not found")
    cursor = db[meta["col"]].find({}).sort(meta["sort"])
    docs = [clean(d) for d in await cursor.to_list(length=1000)]
    if q and docs:
        ql = q.lower()
        docs = [d for d in docs if ql in str(d).lower()]
    return docs


# --------------------------------------------------------------------
# Public writes: contact + newsletter
# --------------------------------------------------------------------
@api.post("/contact")
async def submit_contact(body: ContactBody):
    doc = body.model_dump()
    doc["id"] = str(uuid.uuid4())
    doc["created_at"] = now_iso()
    await db["contact_submissions"].insert_one(doc)
    return {"ok": True, "id": doc["id"]}


@api.post("/newsletter")
async def subscribe_newsletter(body: NewsletterBody):
    email = body.email.lower()
    existing = await db["newsletter_subscribers"].find_one({"email": email})
    if existing:
        return {"ok": True, "id": existing["id"], "already": True}
    doc = {
        "id": str(uuid.uuid4()),
        "email": email,
        "source": body.source or "footer",
        "created_at": now_iso(),
    }
    await db["newsletter_subscribers"].insert_one(doc)
    return {"ok": True, "id": doc["id"]}


# --------------------------------------------------------------------
# Admin CRUD (generic)
# --------------------------------------------------------------------
@api.get("/admin/site", dependencies=[Depends(require_admin)])
async def admin_get_site():
    return clean(await db["site_settings"].find_one({"id": "main"})) or {}


@api.put("/admin/site", dependencies=[Depends(require_admin)])
async def admin_put_site(body: dict):
    body["id"] = "main"
    body["updated_at"] = now_iso()
    await db["site_settings"].update_one({"id": "main"}, {"$set": body}, upsert=True)
    return clean(await db["site_settings"].find_one({"id": "main"}))


@api.get("/admin/about-galleries", dependencies=[Depends(require_admin)])
async def admin_get_galleries():
    return clean(await db["about_galleries"].find_one({"id": "main"})) or {}


@api.put("/admin/about-galleries", dependencies=[Depends(require_admin)])
async def admin_put_galleries(body: dict):
    body["id"] = "main"
    body["updated_at"] = now_iso()
    await db["about_galleries"].update_one({"id": "main"}, {"$set": body}, upsert=True)
    return clean(await db["about_galleries"].find_one({"id": "main"}))


@api.get("/admin/home-about", dependencies=[Depends(require_admin)])
async def admin_get_home_about():
    return clean(await db["home_about"].find_one({"id": "main"})) or {}


@api.put("/admin/home-about", dependencies=[Depends(require_admin)])
async def admin_put_home_about(body: dict):
    body["id"] = "main"
    body["updated_at"] = now_iso()
    await db["home_about"].update_one({"id": "main"}, {"$set": body}, upsert=True)
    return clean(await db["home_about"].find_one({"id": "main"}))


@api.get("/admin/about-section", dependencies=[Depends(require_admin)])
async def admin_get_about_section():
    return clean(await db["about_section"].find_one({"id": "main"})) or {}


@api.put("/admin/about-section", dependencies=[Depends(require_admin)])
async def admin_put_about_section(body: dict):
    body["id"] = "main"
    body["updated_at"] = now_iso()
    await db["about_section"].update_one({"id": "main"}, {"$set": body}, upsert=True)
    return clean(await db["about_section"].find_one({"id": "main"}))


@api.get("/admin/{resource}", dependencies=[Depends(require_admin)])
async def admin_list(resource: str, q: Optional[str] = None, limit: int = 500):
    meta = _res(resource)
    cursor = db[meta["col"]].find({}).sort(meta["sort"]).limit(limit)
    docs = [clean(d) for d in await cursor.to_list(length=limit)]
    if q:
        ql = q.lower()
        docs = [d for d in docs if ql in str(d).lower()]
    return docs


@api.get("/admin/{resource}/{item_id}", dependencies=[Depends(require_admin)])
async def admin_get(resource: str, item_id: str):
    meta = _res(resource)
    doc = clean(await db[meta["col"]].find_one({"id": item_id}))
    if not doc:
        raise HTTPException(status_code=404, detail="Not found")
    return doc


@api.post("/admin/{resource}", dependencies=[Depends(require_admin)])
async def admin_create(resource: str, body: dict):
    meta = _res(resource)
    body["id"] = str(uuid.uuid4())
    body["created_at"] = now_iso()
    await db[meta["col"]].insert_one(body)
    return clean(body)


@api.put("/admin/{resource}/{item_id}", dependencies=[Depends(require_admin)])
async def admin_update(resource: str, item_id: str, body: dict):
    meta = _res(resource)
    body.pop("_id", None)
    body["id"] = item_id
    body["updated_at"] = now_iso()
    res = await db[meta["col"]].update_one({"id": item_id}, {"$set": body}, upsert=False)
    if res.matched_count == 0:
        raise HTTPException(status_code=404, detail="Not found")
    return clean(await db[meta["col"]].find_one({"id": item_id}))


@api.delete("/admin/{resource}/{item_id}", dependencies=[Depends(require_admin)])
async def admin_delete(resource: str, item_id: str):
    meta = _res(resource)
    res = await db[meta["col"]].delete_one({"id": item_id})
    if res.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Not found")
    return {"ok": True}


# --------------------------------------------------------------------
# Register router + static uploads + CORS
# --------------------------------------------------------------------
app.include_router(api)
app.mount("/api/uploads", StaticFiles(directory=str(UPLOAD_DIR)), name="uploads")

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["https://proxy.bionivid.in", "http://localhost:3000"],
    allow_methods=["*"],
    allow_headers=["*"],
)
