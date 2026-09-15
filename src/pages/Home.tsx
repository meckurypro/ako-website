// src/pages/Home.tsx
import { Seo } from "../components/Seo";
import { DownloadButtons } from "../components/DownloadButtons";

const PILLARS = [
  {
    title: "Your actual circle",
    body: "Akọ is built for the people you already know — not an endless stream of strangers optimized for your attention.",
  },
  {
    title: "Private by default",
    body: "No one can search for your number or read your messages. Defaults favor you, not engagement metrics.",
  },
  {
    title: "Room to build",
    body: "Projects, gifts, and a wallet live next to your feed — Akọ is a place to make things with people, not just scroll.",
  },
];

export function Home() {
  return (
    <>
      <Seo
        title="Akọ — where your circle actually shows up"
        description="Akọ is the social app built for real circles, not endless strangers. Feed, projects, wallet, and messaging — private by default, warm by design."
        path="/"
      />

      <section className="site-dark bg-[var(--color-canvas)] pt-16 pb-24 px-4">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="font-display text-5xl md:text-6xl text-[var(--color-ink)] leading-[1.05] mb-6">
              Your circle, <span className="text-accent">not the crowd</span>.
            </h1>
            <p className="text-[var(--color-ink-muted)] text-lg mb-8 max-w-md">
              Akọ is a home for the people you actually talk to — feed, projects, wallet, and
              messaging, built warm and private from the ground up.
            </p>
            <DownloadButtons />
          </div>

          {/* Lightweight CSS phone mockup — no 3D library weight on
              first paint (§62 — 3D performance budget); a real
              WebGL/Spline mockup can replace this later behind the
              same slot without touching layout. */}
          <div className="flex justify-center">
            <div className="w-[260px] h-[540px] rounded-[2.5rem] border-8 border-[var(--color-ink)] bg-[var(--color-surface)] shadow-2xl overflow-hidden relative">
              <div className="h-14 bg-accent flex items-end pb-3 px-4">
                <span className="text-[var(--color-canvas)] font-display text-lg">Akọ</span>
              </div>
              <div className="p-4 space-y-3">
                <div className="h-20 rounded-xl bg-[var(--color-accent-soft)]" />
                <div className="h-32 rounded-xl bg-[var(--color-accent-soft)]" />
                <div className="h-20 rounded-xl bg-[var(--color-accent-soft)]" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-20">
        <div className="grid md:grid-cols-3 gap-10">
          {PILLARS.map((p) => (
            <div key={p.title}>
              <h2 className="font-display text-2xl mb-3">{p.title}</h2>
              <p className="text-[var(--color-ink-muted)]">{p.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="site-dark bg-[var(--color-canvas)] py-20 px-4 text-center">
        <h2 className="font-display text-3xl md:text-4xl text-[var(--color-ink)] mb-4">
          Come find your people.
        </h2>
        <p className="text-[var(--color-ink-muted)] mb-8">
          Free to join. Available wherever you are.
        </p>
        <div className="flex justify-center">
          <DownloadButtons />
        </div>
      </section>
    </>
  );
}
