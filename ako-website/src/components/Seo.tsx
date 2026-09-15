// src/components/Seo.tsx
import { useEffect } from "react";

const SITE_URL = import.meta.env.VITE_SITE_URL || "https://ako.app";
const SITE_NAME = "Akọ";

interface SeoProps {
  title: string;
  description: string;
  path: string;
  noindex?: boolean;
}

function setMeta(attr: "name" | "property", key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

/**
 * Per-page title/description/canonical/OG/robots. A tiny direct-DOM
 * implementation rather than react-helmet-async, which doesn't yet
 * support React 19 as a peer dependency — this avoids pulling in an
 * unmaintained-for-this-version package for four <meta> tags.
 */
export function Seo({ title, description, path, noindex = false }: SeoProps) {
  useEffect(() => {
    const url = `${SITE_URL}${path}`;
    const fullTitle = path === "/" ? title : `${title} · ${SITE_NAME}`;

    document.title = fullTitle;
    setMeta("name", "description", description);

    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", url);

    setMeta("name", "robots", noindex ? "noindex, nofollow" : "index, follow");
    setMeta("property", "og:type", "website");
    setMeta("property", "og:title", fullTitle);
    setMeta("property", "og:description", description);
    setMeta("property", "og:url", url);
    setMeta("property", "og:site_name", SITE_NAME);
    setMeta("name", "twitter:card", "summary_large_image");
    setMeta("name", "twitter:title", fullTitle);
    setMeta("name", "twitter:description", description);
  }, [title, description, path, noindex]);

  return null;
}
