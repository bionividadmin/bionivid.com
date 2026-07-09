import { useEffect, useState } from "react";
import { fetchContent, fetchSite, fetchGalleries } from "../lib/api";

// Simple module-level cache so the same resource isn't refetched
// on every mount / different components.
const cache = new Map();      // key -> data
const inflight = new Map();   // key -> Promise
const listeners = new Map();  // key -> Set(setState)

function loaderFor(resource) {
  if (resource === "site") return fetchSite;
  if (resource === "about-galleries") return fetchGalleries;
  return () => fetchContent(resource);
}

async function loadResource(resource) {
  if (cache.has(resource)) return cache.get(resource);
  if (inflight.has(resource)) return inflight.get(resource);
  const p = loaderFor(resource)()
    .then((d) => {
      cache.set(resource, d);
      // notify listeners
      (listeners.get(resource) || []).forEach((fn) => fn(d));
      return d;
    })
    .finally(() => inflight.delete(resource));
  inflight.set(resource, p);
  return p;
}

export function invalidateContent(resource) {
  cache.delete(resource);
  inflight.delete(resource);
}

/**
 * useContent(resource, fallback)
 * Returns { data, loading, error }.
 * Falls back to `fallback` while loading. Cached across components.
 */
export default function useContent(resource, fallback = null) {
  const [data, setData] = useState(cache.get(resource) ?? fallback);
  const [loading, setLoading] = useState(!cache.has(resource));
  const [error, setError] = useState(null);

  useEffect(() => {
    let alive = true;
    // subscribe
    if (!listeners.has(resource)) listeners.set(resource, new Set());
    const set = (v) => { if (alive) setData(v); };
    listeners.get(resource).add(set);

    if (cache.has(resource)) {
      setData(cache.get(resource));
      setLoading(false);
    } else {
      setLoading(true);
      loadResource(resource)
        .then((d) => { if (alive) { setData(d); setLoading(false); } })
        .catch((e) => { if (alive) { setError(e); setLoading(false); } });
    }
    return () => {
      alive = false;
      listeners.get(resource)?.delete(set);
    };
  }, [resource]);

  return { data, loading, error };
}
