// src/pages/Download.tsx
import { Seo } from "../components/Seo";
import { DownloadButtons } from "../components/DownloadButtons";

export function Download() {
  return (
    <div className="site-dark bg-[var(--color-canvas)] min-h-[70vh] flex items-center">
      <div className="max-w-2xl mx-auto px-4 py-20 text-center text-[var(--color-ink)]">
        <Seo title="Download Akọ" description="Get Akọ on iOS and Android." path="/download" />
        <h1 className="font-display text-5xl mb-4">Get Akọ</h1>
        <p className="text-[var(--color-ink-muted)] text-lg mb-10">
          Free to download. Your circle is waiting.
        </p>
        <div className="flex justify-center">
          <DownloadButtons />
        </div>
      </div>
    </div>
  );
}
