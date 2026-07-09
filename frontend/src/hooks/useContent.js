import { useEffect, useState } from "react";
import { fetchContent, fetchSite, fetchGalleries } from "../lib/api";

/**
 * useContent(resource, fallback)
 * Fetches a list/singleton from the CMS with a mock fallback until it loads.
 * Special resource names: "site", "about-galleries" hit their dedicated endpoints.
 */
export default function useContent(resource, fallback = null) {
  const [data, setData] = useState(fallback);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        setLoading(true);
        let d;
        if (resource === "site") d = await fetchSite();
        else if (resource === "about-galleries") d = await fetchGalleries();
        else d = await fetchContent(resource);
        if (alive) setData(d);
      } catch (e) {
        if (alive) setError(e);
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => { alive = false; };
  }, [resource]);

  return { data, loading, error };
}
