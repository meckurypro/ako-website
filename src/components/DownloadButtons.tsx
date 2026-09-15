// src/components/DownloadButtons.tsx
//
// Both badges are hidden until their store URL env var is set
// (§15 — store link config; §204 — app store links safety: never
// link a store listing that doesn't exist yet).
const APP_STORE_URL = import.meta.env.VITE_APP_STORE_URL;
const PLAY_STORE_URL = import.meta.env.VITE_PLAY_STORE_URL;

export function DownloadButtons() {
  if (!APP_STORE_URL && !PLAY_STORE_URL) {
    return (
      <p className="text-[var(--color-ink-muted)] text-sm">
        Coming soon to the App Store and Google Play.
      </p>
    );
  }

  return (
    <div className="flex flex-wrap gap-3">
      {APP_STORE_URL && (
        <a
          href={APP_STORE_URL}
          className="rounded-xl bg-[var(--color-ink)] text-[var(--color-canvas)] px-5 py-3 text-sm font-medium"
        >
          Download on the App Store
        </a>
      )}
      {PLAY_STORE_URL && (
        <a
          href={PLAY_STORE_URL}
          className="rounded-xl bg-[var(--color-ink)] text-[var(--color-canvas)] px-5 py-3 text-sm font-medium"
        >
          Get it on Google Play
        </a>
      )}
    </div>
  );
}
