import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Dna, LogOut, LayoutDashboard, FileText, Users, MessageSquare, Image as ImageIcon, Newspaper, Award, Beaker, Cog, Building2, Mail, Search, Plus, Pencil, Trash2, Save, X, RefreshCw, ChevronRight, Upload } from "lucide-react";
import { Button } from "../../components/ui/button";
import { useAuth } from "../../context/AuthContext";
import { adminList, adminCreate, adminUpdate, adminDelete, adminGetSite, adminUpdateSite, adminGetGalleries, adminUpdateGalleries, adminGetHomeAbout, adminUpdateHomeAbout, adminGetAboutSection, adminUpdateAboutSection, uploadFile, assetUrl } from "../../lib/api";

// -------------------- Resource registry ----------------
const RESOURCES = [
  { key: "site", label: "Site Settings", icon: Cog, singleton: true, group: "Global" },
  { key: "about-galleries", label: "About Galleries", icon: ImageIcon, singleton: true, group: "Global" },
  { key: "about-section", label: "Who Are We", icon: FileText, singleton: true, group: "About" },
  { key: "hero-slides", label: "Hero Slides", icon: LayoutDashboard, group: "Home", primary: ["eyebrow", "titleAccent", "order"] },
  { key: "home-about", label: "Home About", icon: FileText, singleton: true, group: "Home" },
  { key: "stats", label: "Stats", icon: Award, group: "Home", primary: ["value", "label", "order"] },
  { key: "services", label: "Services", icon: Beaker, group: "Home", primary: ["title", "slug", "order"] },
  { key: "solutions", label: "Solutions", icon: LayoutDashboard, group: "Solutions", primary: ["title", "slug", "order"] },
  { key: "tech-platforms", label: "Tech Platforms", icon: Beaker, group: "Services", primary: ["name", "type", "order"] },
  { key: "omics-categories", label: "Omics Categories", icon: Beaker, group: "Services", primary: ["title", "order"] },
  { key: "values", label: "Values", icon: Award, group: "About", primary: ["title", "order"] },
  { key: "leadership", label: "Leadership", icon: Users, group: "About", primary: ["name", "role", "order"] },
  { key: "clients", label: "Clients", icon: Building2, group: "Marketing", primary: ["name", "order"] },
  { key: "testimonials", label: "Testimonials", icon: MessageSquare, group: "Marketing", primary: ["name", "role", "order"] },
  { key: "publications", label: "Publications", icon: FileText, group: "Content", primary: ["year", "title", "publisher"] },
  { key: "contact-submissions", label: "Contact Submissions", icon: Mail, group: "Inbox", readOnly: true, primary: ["name", "email", "subject"] },
  { key: "newsletter-subscribers", label: "Newsletter Subscribers", icon: Newspaper, group: "Inbox", readOnly: true, primary: ["email", "source"] },
];

// -------------------- Image upload field --------------------
const IMG_FIELDS = /^(image|photo|logo|cover|src|banner|thumbnail|picture|avatar)$/i;
const IMG_EXT = /\.(png|jpe?g|webp|gif|svg)(\?|$)/i;
function isImageField(name, value) {
  if (IMG_FIELDS.test(name)) return true;
  if (typeof value === "string" && (IMG_EXT.test(value) || value.startsWith("/api/uploads/"))) return true;
  return false;
}

function ImageField({ name, value, onChange }) {
  const inputRef = useRef(null);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState(null);

  const onFile = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setBusy(true); setErr(null);
    try {
      const { url } = await uploadFile(file);
      onChange(url);
    } catch (ex) {
      setErr(ex?.response?.data?.detail || "Upload failed");
    } finally { setBusy(false); if (inputRef.current) inputRef.current.value = ""; }
  };

  const preview = assetUrl(value);

  return (
    <div>
      <label className="text-[11px] font-medium uppercase tracking-wider text-gray-500">{name}</label>
      <div className="mt-1 flex items-start gap-3">
        <div className="relative w-24 h-24 rounded-lg border border-gray-200 bg-gray-50 overflow-hidden flex items-center justify-center shrink-0">
          {preview ? (
            <img src={preview} alt={name} className="w-full h-full object-contain" />
          ) : (
            <ImageIcon className="w-6 h-6 text-gray-300" />
          )}
          {busy && <div className="absolute inset-0 bg-white/70 flex items-center justify-center text-xs text-green-700">Uploading…</div>}
        </div>
        <div className="flex-1 min-w-0">
          <input value={value ?? ""} onChange={(e) => onChange(e.target.value)} placeholder="Image URL or upload…" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-xs font-mono focus:outline-none focus:border-green-500" />
          <div className="mt-2 flex items-center gap-2">
            <input ref={inputRef} type="file" accept="image/*" onChange={onFile} className="hidden" />
            <button type="button" onClick={() => inputRef.current?.click()} disabled={busy} className="inline-flex items-center gap-1 text-xs px-3 py-1.5 rounded-full bg-green-600 text-white hover:bg-green-700 disabled:opacity-60"><Upload className="w-3.5 h-3.5" />{busy ? "Uploading…" : "Upload"}</button>
            {value && <button type="button" onClick={() => onChange("")} className="text-xs text-gray-500 hover:text-red-600">Clear</button>}
          </div>
          {err && <p className="text-xs text-red-600 mt-1">{err}</p>}
        </div>
      </div>
    </div>
  );
}

// -------------------- Field editor --------------------
function FieldEditor({ name, value, onChange }) {
  if (name === "homeAbout" && value && typeof value === "object" && !Array.isArray(value)) {
    return <HomeAboutEditor value={value} onChange={onChange} />;
  }
  if (isImageField(name, value) && (typeof value === "string" || value == null || value === undefined)) {
    return <ImageField name={name} value={value} onChange={onChange} />;
  }
  const isBool = typeof value === "boolean";
  const isNumber = typeof value === "number";
  const isArray = Array.isArray(value);
  const isObject = value && typeof value === "object" && !isArray;
  const isLongText = typeof value === "string" && (value.length > 90 || /body|description|intro|address|message/i.test(name));
  const label = <label className="text-[11px] font-medium uppercase tracking-wider text-gray-500">{name}</label>;

  if (isBool) {
    return (
      <div className="flex items-center justify-between border border-gray-200 rounded-lg px-3 py-2">
        {label}
        <input type="checkbox" checked={value} onChange={(e) => onChange(e.target.checked)} />
      </div>
    );
  }
  if (isArray || isObject) {
    return (
      <div>
        {label}
        <textarea rows={Math.min(12, Math.max(4, JSON.stringify(value, null, 2).split("\n").length))} defaultValue={JSON.stringify(value, null, 2)}
          onBlur={(e) => {
            try { onChange(JSON.parse(e.target.value)); }
            catch { /* keep old value */ }
          }}
          className="mt-1 w-full px-3 py-2 border border-gray-200 rounded-lg text-xs font-mono focus:outline-none focus:border-green-500" />
        <p className="text-[10px] text-gray-400 mt-1">Edit as JSON; changes apply on blur.</p>
      </div>
    );
  }
  if (isNumber) {
    return (
      <div>
        {label}
        <input type="number" value={value} onChange={(e) => onChange(e.target.value === "" ? 0 : Number(e.target.value))} className="mt-1 w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-green-500" />
      </div>
    );
  }
  return (
    <div>
      {label}
      {isLongText ? (
        <textarea rows={4} value={value ?? ""} onChange={(e) => onChange(e.target.value)} className="mt-1 w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-green-500" />
      ) : (
        <input type="text" value={value ?? ""} onChange={(e) => onChange(e.target.value)} className="mt-1 w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-green-500" />
      )}
    </div>
  );
}

function ItemForm({ initial, onSave, onCancel, saving, hideFields = [] }) {
  const [doc, setDoc] = useState(initial || {});
  useEffect(() => { setDoc(initial || {}); }, [initial]);
  const fields = Object.keys(doc || {})
    .filter((k) => !/^(?:_|id|created_at|updated_at)$/.test(k))
    .filter((k) => !hideFields.includes(k));

  const set = (k, v) => setDoc((d) => ({ ...d, [k]: v }));

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {fields.map((k) => (
          <div key={k} className={/description|body|intro|address|message/i.test(k) ? "md:col-span-2" : ""}>
            <FieldEditor name={k} value={doc[k]} onChange={(v) => set(k, v)} />
          </div>
        ))}
      </div>
      <div className="flex items-center justify-end pt-3 border-t border-gray-100">
        <div className="flex gap-2">
          <Button type="button" variant="outline" onClick={onCancel} className="rounded-full"><X className="w-4 h-4 mr-1" />Cancel</Button>
          <Button type="button" disabled={saving} onClick={() => onSave(doc)} className="bg-green-600 hover:bg-green-700 rounded-full"><Save className="w-4 h-4 mr-1" />{saving ? "Saving..." : "Save"}</Button>
        </div>
      </div>
    </div>
  );
}

function HomeAboutEditor({ value = {}, onChange }) {
  const about = useMemo(() => ({
    eyebrow: "",
    titleTop: "",
    titleAccent: "",
    titleBottom: "",
    description: "",
    descriptionSecondary: "",
    images: [],
    mainImageIndex: 0,
    ...value,
    images: value?.images || [],
  }), [value]);

  const update = (updater) => {
    const next = typeof updater === "function" ? updater(about) : { ...about, ...updater };
    onChange(next);
  };

  const setImageField = (index, key, val) => {
    update((prev) => {
      const images = [...(prev.images || [])];
      images[index] = { ...(images[index] || {}), [key]: val };
      return { ...prev, images };
    });
  };

  const images = [...(about.images || [])];
  while (images.length < 3) images.push({ src: "", alt: "" });

  return (
    <div className="space-y-4 border border-gray-200 rounded-2xl p-4 bg-gray-50">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div>
          <label className="text-[11px] font-medium uppercase tracking-wider text-gray-500">eyebrow</label>
          <input value={about.eyebrow ?? ""} onChange={(e) => update({ eyebrow: e.target.value })} className="mt-1 w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-green-500" />
        </div>
        <div>
          <label className="text-[11px] font-medium uppercase tracking-wider text-gray-500">titleTop</label>
          <input value={about.titleTop ?? ""} onChange={(e) => update({ titleTop: e.target.value })} className="mt-1 w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-green-500" />
        </div>
        <div>
          <label className="text-[11px] font-medium uppercase tracking-wider text-gray-500">titleAccent</label>
          <input value={about.titleAccent ?? ""} onChange={(e) => update({ titleAccent: e.target.value })} className="mt-1 w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-green-500" />
        </div>
        <div>
          <label className="text-[11px] font-medium uppercase tracking-wider text-gray-500">titleBottom</label>
          <input value={about.titleBottom ?? ""} onChange={(e) => update({ titleBottom: e.target.value })} className="mt-1 w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-green-500" />
        </div>
      </div>
      <div className="grid grid-cols-1 gap-3">
        <div>
          <label className="text-[11px] font-medium uppercase tracking-wider text-gray-500">description</label>
          <textarea rows={3} value={about.description ?? ""} onChange={(e) => update({ description: e.target.value })} className="mt-1 w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-green-500" />
        </div>
        <div>
          <label className="text-[11px] font-medium uppercase tracking-wider text-gray-500">descriptionSecondary</label>
          <textarea rows={3} value={about.descriptionSecondary ?? ""} onChange={(e) => update({ descriptionSecondary: e.target.value })} className="mt-1 w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-green-500" />
        </div>
      </div>
      <div className="grid gap-3">
        {images.map((img, index) => (
          <div key={index} className="rounded-2xl border border-gray-200 p-4">
            <div className="flex items-center justify-between gap-3 mb-4">
              <div>
                <div className="text-[11px] font-medium uppercase tracking-wider text-gray-500">Image {index + 1}</div>
                <div className="text-xs text-gray-400">Upload a URL or file</div>
              </div>
              <label className="text-[11px] text-gray-500 inline-flex items-center gap-2">
                <input type="radio" checked={about.mainImageIndex === index} onChange={() => update({ mainImageIndex: index })} />
                Main
              </label>
            </div>
            <ImageField name={`src`} value={img.src} onChange={(src) => setImageField(index, "src", src)} />
            <div className="mt-3">
              <label className="text-[11px] font-medium uppercase tracking-wider text-gray-500">alt</label>
              <input value={img.alt ?? ""} onChange={(e) => setImageField(index, "alt", e.target.value)} className="mt-1 w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-green-500" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AboutSectionEditor({ value = {}, onChange }) {
  const section = useMemo(() => ({
    eyebrow: "",
    titleTop: "",
    titleAccent: "",
    descriptions: ["", "", ""],
    images: [],
    mainImageIndex: 0,
    ...value,
    descriptions: value?.descriptions || ["", "", ""],
    images: value?.images || [],
  }), [value]);

  const update = (updater) => {
    const next = typeof updater === "function" ? updater(section) : { ...section, ...updater };
    onChange(next);
  };

  const setDescription = (index, val) => {
    update((prev) => {
      const descriptions = [...(prev.descriptions || [])];
      descriptions[index] = val;
      return { ...prev, descriptions };
    });
  };

  const setImageField = (index, key, val) => {
    update((prev) => {
      const images = [...(prev.images || [])];
      images[index] = { ...(images[index] || {}), [key]: val };
      return { ...prev, images };
    });
  };

  const images = [...(section.images || [])];
  while (images.length < 3) images.push({ src: "", alt: "" });

  const descriptions = [...(section.descriptions || [])];
  while (descriptions.length < 3) descriptions.push("");

  return (
    <div className="space-y-4 border border-gray-200 rounded-2xl p-4 bg-gray-50">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div>
          <label className="text-[11px] font-medium uppercase tracking-wider text-gray-500">eyebrow</label>
          <input value={section.eyebrow ?? ""} onChange={(e) => update({ eyebrow: e.target.value })} className="mt-1 w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-green-500" />
        </div>
        <div>
          <label className="text-[11px] font-medium uppercase tracking-wider text-gray-500">titleTop</label>
          <input value={section.titleTop ?? ""} onChange={(e) => update({ titleTop: e.target.value })} className="mt-1 w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-green-500" />
        </div>
        <div>
          <label className="text-[11px] font-medium uppercase tracking-wider text-gray-500">titleAccent</label>
          <input value={section.titleAccent ?? ""} onChange={(e) => update({ titleAccent: e.target.value })} className="mt-1 w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-green-500" />
        </div>
      </div>
      <div className="grid grid-cols-1 gap-3">
        {descriptions.map((text, index) => (
          <div key={index}>
            <label className="text-[11px] font-medium uppercase tracking-wider text-gray-500">Description {index + 1}</label>
            <textarea rows={3} value={text} onChange={(e) => setDescription(index, e.target.value)} className="mt-1 w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-green-500" />
          </div>
        ))}
      </div>
      <div className="grid gap-3">
        {images.map((img, index) => (
          <div key={index} className="rounded-2xl border border-gray-200 p-4">
            <div className="flex items-center justify-between gap-3 mb-4">
              <div>
                <div className="text-[11px] font-medium uppercase tracking-wider text-gray-500">Image {index + 1}</div>
                <div className="text-xs text-gray-400">Upload a URL or file</div>
              </div>
              <label className="text-[11px] text-gray-500 inline-flex items-center gap-2">
                <input type="radio" checked={section.mainImageIndex === index} onChange={() => update({ mainImageIndex: index })} />
                Main
              </label>
            </div>
            <ImageField name={`src`} value={img.src} onChange={(src) => setImageField(index, "src", src)} />
            <div className="mt-3">
              <label className="text-[11px] font-medium uppercase tracking-wider text-gray-500">alt</label>
              <input value={img.alt ?? ""} onChange={(e) => setImageField(index, "alt", e.target.value)} className="mt-1 w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-green-500" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// -------------------- Main dashboard --------------------
export default function AdminDashboard() {
  const { admin, loading: authLoading, logout } = useAuth();
  const nav = useNavigate();

  const [activeKey, setActiveKey] = useState("hero-slides");
  const active = useMemo(() => RESOURCES.find((r) => r.key === activeKey), [activeKey]);

  const [items, setItems] = useState([]);
  const [singleton, setSingleton] = useState(null);
  const [loading, setLoading] = useState(false);
  const [q, setQ] = useState("");
  const [editing, setEditing] = useState(null); // {doc, isNew}
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState(null);

  const loadList = useCallback(async () => {
    if (!active) return;
    setLoading(true);
    try {
      if (active.singleton) {
        let d;
        if (active.key === "site") d = await adminGetSite();
        else if (active.key === "about-galleries") d = await adminGetGalleries();
        else if (active.key === "home-about") d = await adminGetHomeAbout();
        else if (active.key === "about-section") d = await adminGetAboutSection();
        setSingleton(d);
        setItems([]);
      } else {
        const list = await adminList(active.key);
        setItems(list || []);
        setSingleton(null);
      }
    } catch (e) {
      setMsg({ type: "error", text: e?.response?.data?.detail || "Failed to load" });
    } finally { setLoading(false); }
  }, [active]);

  useEffect(() => {
    if (active) {
      setEditing(null);
      loadList();
    }
  }, [active, loadList]);

  if (authLoading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (!admin) return <Navigate to="/admin/login" replace />;

  const filtered = q ? items.filter((it) => JSON.stringify(it).toLowerCase().includes(q.toLowerCase())) : items;

  const startNew = () => {
    if (!active || active.singleton || active.readOnly) return;
    // Build empty doc based on first existing item shape or on resource primary keys
    const template = items[0]
      ? Object.fromEntries(Object.keys(items[0]).filter((k) => !/^(id|_id|created_at|updated_at)$/.test(k)).map((k) => [k, Array.isArray(items[0][k]) ? [] : typeof items[0][k] === "number" ? 0 : typeof items[0][k] === "boolean" ? false : (items[0][k] && typeof items[0][k] === "object" ? {} : "")]))
      : active.primary
        ? Object.fromEntries(active.primary.map((k) => [k, ""]))
        : {};
    setEditing({ doc: template, isNew: true });
  };

  const doSave = async (doc) => {
    setSaving(true);
    try {
      if (active.singleton) {
        const fn = active.key === "site"
          ? adminUpdateSite
          : active.key === "about-galleries"
            ? adminUpdateGalleries
            : active.key === "home-about"
              ? adminUpdateHomeAbout
              : active.key === "about-section"
                ? adminUpdateAboutSection
                : null;
        if (!fn) throw new Error("Unknown singleton save target");
        const saved = await fn(doc);
        setSingleton(saved);
        setMsg({ type: "success", text: "Saved" });
      } else if (editing?.isNew) {
        const clean = { ...doc };
        delete clean.id;
        const saved = await adminCreate(active.key, clean);
        setItems((arr) => [saved, ...arr]);
        setMsg({ type: "success", text: "Created" });
        setEditing(null);
      } else {
        const saved = await adminUpdate(active.key, doc.id, doc);
        setItems((arr) => arr.map((x) => (x.id === saved.id ? saved : x)));
        setMsg({ type: "success", text: "Updated" });
        setEditing(null);
      }
    } catch (e) {
      setMsg({ type: "error", text: e?.response?.data?.detail || "Save failed" });
    } finally { setSaving(false); setTimeout(() => setMsg(null), 2500); }
  };

  const doDelete = async (row) => {
    if (items.length <= 1) {
      setMsg({ type: "error", text: "At least one item is required; cannot delete the last entry." });
      setTimeout(() => setMsg(null), 2500);
      return;
    }
    if (!window.confirm("Delete this item?")) return;
    try {
      await adminDelete(active.key, row.id);
      setItems((arr) => arr.filter((x) => x.id !== row.id));
      setMsg({ type: "success", text: "Deleted" });
    } catch (e) {
      setMsg({ type: "error", text: e?.response?.data?.detail || "Delete failed" });
    } finally { setTimeout(() => setMsg(null), 2500); }
  };

  const groups = Array.from(new Set(RESOURCES.map((r) => r.group)));

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-100 flex flex-col shrink-0 sticky top-0 h-screen">
        <div className="px-5 py-5 border-b border-gray-100 flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-green-500 to-green-700 flex items-center justify-center"><Dna className="w-5 h-5 text-white" /></div>
          <div>
            <div className="font-bold text-gray-900 leading-tight">bionivid CMS</div>
            <div className="text-[11px] text-gray-500">{admin?.email}</div>
          </div>
        </div>
        <nav className="flex-1 overflow-y-auto py-3">
          {groups.map((g) => (
            <div key={g} className="mb-4">
              <div className="px-5 text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">{g}</div>
              {RESOURCES.filter((r) => r.group === g).map((r) => {
                const Icon = r.icon;
                return (
                  <button key={r.key} onClick={() => setActiveKey(r.key)} className={`w-full flex items-center gap-3 px-5 py-2 text-sm text-left transition-colors ${activeKey === r.key ? "bg-green-50 text-green-700 border-r-2 border-green-600 font-semibold" : "text-gray-700 hover:bg-gray-50"}`}>
                    <Icon className="w-4 h-4" />{r.label}
                    {activeKey === r.key && <ChevronRight className="w-4 h-4 ml-auto" />}
                  </button>
                );
              })}
            </div>
          ))}
        </nav>
        <div className="p-4 border-t border-gray-100 flex flex-col gap-2">
          <Button asChild variant="outline" size="sm" className="rounded-full"><Link to="/">View Site</Link></Button>
          <Button onClick={() => { logout(); nav("/admin/login"); }} variant="outline" size="sm" className="rounded-full text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700"><LogOut className="w-4 h-4 mr-1" />Sign out</Button>
        </div>
      </aside>

      {/* Main area */}
      <main className="flex-1 min-w-0">
        <header className="bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between sticky top-0 z-10">
          <div>
            <h1 className="text-lg font-semibold font-display text-gray-900">{active?.label}</h1>
            <p className="text-xs text-gray-500">{active?.singleton ? "Singleton document" : active?.readOnly ? "Read-only" : `${filtered.length} item(s)`}</p>
          </div>
          <div className="flex items-center gap-2">
            {!active?.singleton && !active?.readOnly && (
              <Button onClick={startNew} className="bg-green-600 hover:bg-green-700 rounded-full"><Plus className="w-4 h-4 mr-1" />New</Button>
            )}
            <button onClick={loadList} className="w-9 h-9 rounded-full border border-gray-200 hover:bg-gray-50 flex items-center justify-center" aria-label="Refresh"><RefreshCw className="w-4 h-4" /></button>
          </div>
        </header>

        <div className="p-6">
          <AnimatePresence>
            {msg && (
              <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className={`mb-4 px-4 py-2 rounded-lg text-sm ${msg.type === "success" ? "bg-green-50 border border-green-200 text-green-800" : "bg-red-50 border border-red-200 text-red-800"}`}>{msg.text}</motion.div>
            )}
          </AnimatePresence>

          {/* Singleton editor */}
          {active?.singleton && (
            <div className="bg-white rounded-2xl border border-gray-100 p-6">
              {loading ? <div className="text-sm text-gray-500">Loading...</div> : (
                active.key === "home-about" || active.key === "about-section" ? (
                  <div className="space-y-6">
                    {active.key === "about-section" ? (
                      <AboutSectionEditor value={singleton || {}} onChange={setSingleton} />
                    ) : (
                      <HomeAboutEditor value={singleton || {}} onChange={setSingleton} />
                    )}
                    <div className="flex items-center justify-end gap-2">
                      <Button type="button" variant="outline" onClick={() => loadList()} className="rounded-full"><X className="w-4 h-4 mr-1" />Cancel</Button>
                      <Button type="button" disabled={saving} onClick={() => doSave(singleton)} className="bg-green-600 hover:bg-green-700 rounded-full"><Save className="w-4 h-4 mr-1" />{saving ? "Saving..." : "Save"}</Button>
                    </div>
                  </div>
                ) : (
                  <ItemForm initial={singleton || {}} onSave={doSave} onCancel={() => loadList()} saving={saving} hideFields={active.key === "site" ? ["homeAbout"] : []} />
                )
              )}
            </div>
          )}

          {/* List + editor */}
          {!active?.singleton && (
            <>
              <div className="mb-4 flex items-center gap-3">
                <div className="relative flex-1 max-w-md">
                  <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search..." className="w-full pl-9 pr-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-green-500" />
                </div>
                <span className="text-xs text-gray-500">{filtered.length} / {items.length}</span>
              </div>

              <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-50 border-b border-gray-100">
                      <tr>
                        {(active.primary || Object.keys(items[0] || {}).filter((c) => !/^(?:id|_id|created_at|updated_at)$/.test(c)).slice(0, 4)).map((c) => (
                          <th key={c} className="text-left px-4 py-2.5 font-semibold text-gray-600 text-xs uppercase tracking-wider">{c}</th>
                        ))}
                        {!active.readOnly && <th className="px-4 py-2.5 text-right w-32"></th>}
                        {active.readOnly && <th className="px-4 py-2.5 text-right w-20"></th>}
                      </tr>
                    </thead>
                    <tbody>
                      {loading && (<tr><td colSpan={99} className="text-center py-10 text-gray-400">Loading...</td></tr>)}
                      {!loading && filtered.length === 0 && (<tr><td colSpan={99} className="text-center py-10 text-gray-400">No items</td></tr>)}
                      {!loading && filtered.map((row) => (
                        <tr key={row.id} className="border-b border-gray-50 hover:bg-green-50/30">
                          {(active.primary || Object.keys(items[0] || {}).filter((c) => !/^(?:id|_id|created_at|updated_at)$/.test(c)).slice(0, 4)).map((c) => {
                            const v = row[c];
                            const display = v && typeof v === "object" ? JSON.stringify(v).slice(0, 60) : String(v ?? "").slice(0, 90);
                            return <td key={c} className="px-4 py-2.5 text-gray-800 align-top">{display}</td>;
                          })}
                          <td className="px-4 py-2 text-right whitespace-nowrap">
                            {!active.readOnly && (
                              <button onClick={() => setEditing({ doc: row, isNew: false })} className="inline-flex items-center gap-1 text-xs text-green-700 hover:bg-green-50 rounded-md px-2 py-1"><Pencil className="w-3.5 h-3.5" />Edit</button>
                            )}
                            <button onClick={() => doDelete(row)} className="inline-flex items-center gap-1 text-xs text-red-600 hover:bg-red-50 rounded-md px-2 py-1 ml-1"><Trash2 className="w-3.5 h-3.5" />Delete</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Edit slideover */}
        <AnimatePresence>
          {editing && (
            <>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setEditing(null)} className="fixed inset-0 bg-black/30 z-30" />
              <motion.aside initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "tween", duration: 0.25 }} className="fixed top-0 right-0 bottom-0 w-full max-w-2xl bg-white z-40 shadow-2xl overflow-y-auto">
                <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between sticky top-0 bg-white">
                  <h3 className="font-semibold text-gray-900">{editing.isNew ? `New ${active.label} item` : `Edit ${active.label}`}</h3>
                  <button onClick={() => setEditing(null)} className="w-9 h-9 rounded-full hover:bg-gray-100 flex items-center justify-center"><X className="w-4 h-4" /></button>
                </div>
                <div className="p-6">
                  <ItemForm initial={editing.doc} onSave={doSave} onCancel={() => setEditing(null)} saving={saving} />
                </div>
              </motion.aside>
            </>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
