// src/pages/Home.tsx
import { Seo } from "../components/Seo";
import { DownloadButtons } from "../components/DownloadButtons";
import { AppIcon } from "../components/AppIcon";
import { Container } from "../components/Container";

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
        title="Akọ — a reason to reason"
        description="Akọ is the social platform for discovering ideas, connecting people, and building value."
        path="/"
      />

      {/* Light theme throughout — this is the "front door" page,
          kept calm and minimal rather than alternating tone
          mid-page. Security/Download opt into the dark theme
          instead, each as one consistent full page. */}
      <section className="pt-20 pb-24">
        <Container className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <AppIcon size={48} />
            <h1 className="font-display text-5xl md:text-6xl leading-[1.05] mt-6 mb-6">
              Your circle,{" "}
              <span className="relative">
                not the crowd
                <span
                  className="absolute left-0 right-0 -bottom-1 h-[3px] rounded-full"
                  style={{ backgroundColor: "var(--color-flame)" }}
                />
              </span>
              .
            </h1>
            <p className="text-[var(--color-ink-muted)] text-lg mb-8 max-w-md">
              A home for the people you actually talk to — feed, projects, wallet, and messaging.
            </p>
            <DownloadButtons />
          </div>

          {/* Lightweight CSS phone mockup, kept minimal/neutral —
              no 3D library weight on first paint (§62 — 3D
              performance budget). */}
          <div className="flex justify-center">
            <div className="glass w-[260px] h-[520px] rounded-[2.5rem] p-4">
              <div className="flex justify-center pt-4 pb-6">
                <AppIcon size={40} />
              </div>
              <div className="space-y-3">
                <div className="h-20 rounded-2xl border border-[var(--color-border)]" />
                <div className="h-32 rounded-2xl border border-[var(--color-border)]" />
                <div className="h-20 rounded-2xl border border-[var(--color-border)]" />
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-20 border-t border-[var(--color-border)]">
        <Container className="grid md:grid-cols-3 gap-6">
          {PILLARS.map((p) => (
            <div key={p.title} className="glass rounded-2xl p-6">
              <h2 className="font-display text-2xl mb-3">{p.title}</h2>
              <p className="text-[var(--color-ink-muted)]">{p.body}</p>
            </div>
          ))}
        </Container>
      </section>

      <section className="py-20 border-t border-[var(--color-border)] text-center">
        <Container>
          <h2 className="font-display text-3xl md:text-4xl mb-4">Come find your people.</h2>
          <p className="text-[var(--color-ink-muted)] mb-8">
            Free to join. Available wherever you are.
          </p>
          <div className="flex justify-center">
            <DownloadButtons />
          </div>
        </Container>
      </section>
    </>
  );
}
