# Bionivid CMS — API Contracts

## Stack
- Backend: FastAPI + Motor (MongoDB async)
- Auth: JWT (HS256), bcrypt for password hashing
- Prefix: **all routes must start with `/api`** (Kubernetes ingress rule)

## Auth
Seeded admin (created on startup if not present):
- email: `admin@bionivid.com`
- password: `Admin@1234`
- Role: `admin`

JWT is returned by `POST /api/auth/login` and must be sent as `Authorization: Bearer <token>` on all admin routes. Access token expiry: 7 days.

## Collections (MongoDB)
Each document uses a UUID `id` field (not Mongo `_id`). Timestamps `created_at`, `updated_at` optional.

| Collection | Purpose | Shape (example) |
|---|---|---|
| `admins` | Admin users | `{id,email,name,password_hash,created_at}` |
| `site_settings` | Global site info (single doc, id="main") | `{id:"main", name, tagline, since, email, phone, address, socials{}, nivilabsUrl}` |
| `hero_slides` | Home hero carousel | `{id,order,eyebrow,titleTop,titleAccent,titleBottom,body,image,ctas[]}` |
| `stats` | 4 counters | `{id,order,value,label,icon}` |
| `services` | Home services cards | `{id,order,slug,title,icon,short}` |
| `solutions` | Genomics Solutions | `{id,order,slug,title,tagline,image,description,features[],externalUrl?}` |
| `tech_platforms` | Illumina, PacBio, Nanopore | `{id,order,name,type,image}` |
| `omics_categories` | GENOME/MICROBIOME/etc | `{id,order,title,icon,items[]}` |
| `values` | Teamwork/Leadership/etc | `{id,order,title,icon,body}` |
| `leadership` | Founders/Directors | `{id,order,name,role,photo,linkedin}` |
| `about_galleries` | Team + Culture sliders (single doc, id="main") | `{id:"main", team:{eyebrow,title,accent,description,images:[{src,caption}]}, culture:{...}}` |
| `clients` | Client logos | `{id,order,name,logo}` |
| `testimonials` | Quote cards | `{id,order,quote,name,role}` |
| `publications` | Publications table | `{id,year,title,publisher,link}` |
| `contact_submissions` | Contact form entries (read-only in UI) | `{id,name,email,org,phone,subject,message,created_at}` |
| `newsletter_subscribers` | Newsletter emails | `{id,email,source,created_at}` |

## Endpoints

### Auth
- `POST /api/auth/login`  body:`{email,password}` → `{access_token, admin:{id,email,name}}`
- `GET  /api/auth/me`     header:auth → current admin

### Public content (no auth)
Generic pattern for read-heavy content:
- `GET /api/content/site` → single site_settings doc
- `GET /api/content/about-galleries` → single doc
- `GET /api/content/{resource}` → list (sorted by `order` when present, else `year desc` for publications)
    - resources: `hero-slides, stats, services, solutions, tech-platforms, omics-categories, values, leadership, clients, testimonials, publications`

### Public writes
- `POST /api/contact`     body:`{name,email,org?,phone?,subject?,message}` → `{ok:true, id}`
- `POST /api/newsletter`  body:`{email,source?}` → `{ok:true, id}` (dedupes by email)

### Admin (protected, `Authorization: Bearer <token>`)
Generic CRUD per resource (`{resource}` from list above plus `contact-submissions`, `newsletter-subscribers`):
- `GET    /api/admin/{resource}`         → list (with search + sort)
- `GET    /api/admin/{resource}/{id}`    → item
- `POST   /api/admin/{resource}`         → create (id auto-generated)
- `PUT    /api/admin/{resource}/{id}`    → update
- `DELETE /api/admin/{resource}/{id}`    → delete

Singleton resources:
- `PUT /api/admin/site` — update site settings (id="main")
- `PUT /api/admin/about-galleries` — update galleries doc (id="main")

## Frontend integration
- New `src/lib/api.js` axios instance with `REACT_APP_BACKEND_URL + /api` base + JWT interceptor.
- New `src/hooks/useContent.js` hook to fetch + cache resource lists.
- Public pages replace direct `mock.js` imports with API calls (`hero_slides`, `publications`, etc.). Existing `mock.js` kept as fallback while API loads (progressive).
- `/admin/login` — email+password form → stores JWT in localStorage.
- `/admin` — dashboard with sidebar (all resources) + table + inline edit dialogs.

## Seeding
On backend startup:
1. Create admin if `admins` empty.
2. For each collection listed above, if it is empty, insert the initial data from `seed_data.py` (mirrors `mock.js`). Idempotent.
