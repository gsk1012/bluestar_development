import { useEffect } from "react";

const BASE = "https://bluestardevelopment.nl";

/**
 * Titel, beschrijving en canonical bijwerken bij navigatie in de browser. De
 * voorgerenderde HTML heeft ze al (scripts/prerender.js), samen met de JSON-LD.
 *
 * @param {string} path - bv. "/contact"; leeg = niets doen (pagina bestaat niet)
 */
export default function usePageMeta(path, title, description) {
  useEffect(() => {
    if (!path) return;
    const desc = document.querySelector('meta[name="description"]');
    const canonical = document.querySelector('link[rel="canonical"]');
    const prev = { title: document.title, desc: desc?.content, canonical: canonical?.href };
    document.title = title;
    desc?.setAttribute("content", description);
    canonical?.setAttribute("href", `${BASE}${path}`);
    return () => {
      document.title = prev.title;
      if (prev.desc) desc?.setAttribute("content", prev.desc);
      if (prev.canonical) canonical?.setAttribute("href", prev.canonical);
    };
  }, [path, title, description]);
}
