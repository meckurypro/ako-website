// src/pages/NotFound.tsx
import { Link } from "react-router-dom";
import { Seo } from "../components/Seo";

export function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
      <Seo title="Page not found" description="This page doesn't exist." path="/404" noindex />
      <h1 className="font-display text-6xl text-accent mb-4">404</h1>
      <p className="text-[var(--color-ink-muted)] mb-8">This page doesn't exist, or moved.</p>
      <Link to="/" className="bg-accent text-[var(--color-canvas)] rounded-full px-6 py-3 font-medium">
        Back home
      </Link>
    </div>
  );
}
