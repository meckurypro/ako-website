// src/pages/About.tsx
import { Seo } from "../components/Seo";

export function About() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <Seo
        title="About Akọ"
        description="Why Akọ exists, and what it's trying to be for the people who use it."
        path="/about"
      />
      <h1 className="font-display text-4xl mb-6">About Akọ</h1>
      <p className="text-[var(--color-ink-muted)] text-lg mb-4">
        Akọ started from a simple frustration: most social apps are built to maximize time spent,
        not to actually serve the relationships people came for.
      </p>
      <p className="text-[var(--color-ink-muted)] text-lg mb-4">
        We built Akọ for real circles — the friends, collaborators, and communities you already
        care about — with privacy as a default, not a settings menu you have to go find.
      </p>
      <p className="text-[var(--color-ink-muted)] text-lg">
        It's early. We're building in public, listening closely, and trying to earn trust one
        release at a time.
      </p>
    </div>
  );
}
