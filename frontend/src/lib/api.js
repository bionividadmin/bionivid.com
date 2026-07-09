import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
export const API_BASE = `${BACKEND_URL}/api`;

export const TOKEN_KEY = "bionivid_admin_token";

export const api = axios.create({
  baseURL: API_BASE,
  headers: { "Content-Type": "application/json" },
  timeout: 20000,
});

// Convert relative /api/uploads/... paths to absolute URLs (leaves absolute URLs alone).
export function assetUrl(u) {
  if (!u) return u;
  if (typeof u !== "string") return u;
  if (/^https?:\/\//i.test(u)) return u;
  if (u.startsWith("/")) return `${BACKEND_URL}${u}`;
  return u;
}

// Upload a file (admin only). Returns { url: "/api/uploads/xxx.png", filename, size }.
export async function uploadFile(file) {
  const fd = new FormData();
  fd.append("file", file);
  const res = await api.post("/admin/upload", fd, { headers: { "Content-Type": "multipart/form-data" } });
  return { ...res.data, absoluteUrl: assetUrl(res.data.url) };
}

// Attach token if present
api.interceptors.request.use((config) => {
  const token = localStorage.getItem(TOKEN_KEY);
  if (token) config.headers["Authorization"] = `Bearer ${token}`;
  return config;
});

// Auto-logout on 401 for admin routes
api.interceptors.response.use(
  (r) => r,
  (err) => {
    const status = err?.response?.status;
    const url = err?.config?.url || "";
    if (status === 401 && url.includes("/admin/")) {
      localStorage.removeItem(TOKEN_KEY);
      if (typeof window !== "undefined" && !window.location.pathname.startsWith("/admin/login")) {
        window.location.href = "/admin/login";
      }
    }
    return Promise.reject(err);
  }
);

// -------- Public helpers --------
export const fetchContent = (resource) => api.get(`/content/${resource}`).then((r) => r.data);
export const fetchSite = () => api.get("/content/site").then((r) => r.data);
export const fetchGalleries = () => api.get("/content/about-galleries").then((r) => r.data);
export const submitContact = (body) => api.post("/contact", body).then((r) => r.data);
export const subscribeNewsletter = (body) => api.post("/newsletter", body).then((r) => r.data);

// -------- Admin helpers --------
export const adminLogin = (email, password) =>
  api.post("/auth/login", { email, password }).then((r) => r.data);
export const adminMe = () => api.get("/auth/me").then((r) => r.data);

export const adminList = (resource, params = {}) =>
  api.get(`/admin/${resource}`, { params }).then((r) => r.data);
export const adminGet = (resource, id) =>
  api.get(`/admin/${resource}/${id}`).then((r) => r.data);
export const adminCreate = (resource, body) =>
  api.post(`/admin/${resource}`, body).then((r) => r.data);
export const adminUpdate = (resource, id, body) =>
  api.put(`/admin/${resource}/${id}`, body).then((r) => r.data);
export const adminDelete = (resource, id) =>
  api.delete(`/admin/${resource}/${id}`).then((r) => r.data);

// Singletons
export const adminGetSite = () => api.get("/admin/site").then((r) => r.data);
export const adminUpdateSite = (body) => api.put("/admin/site", body).then((r) => r.data);
export const adminGetGalleries = () => api.get("/admin/about-galleries").then((r) => r.data);
export const adminUpdateGalleries = (body) => api.put("/admin/about-galleries", body).then((r) => r.data);
