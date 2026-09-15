// src/pages/Download.tsx
import { Seo } from "../components/Seo";
import { DownloadButtons } from "../components/DownloadButtons";
import { AppIcon } from "../components/AppIcon";
import { Container } from "../components/Container";

export function Download() {
  return (
    <div className="site-dark bg-[var(--color-canvas)] min-h-[70vh] flex items-center">
      <Container className="py-20 text-center">
        <Seo title="Download Akọ" description="Get Akọ on iOS and Android." path="/download" />
        <div className="flex justify-center mb-6">
          <div className="glass rounded-3xl p-5">
            <AppIcon size={56} />
          </div>
        </div>
        <h1 className="font-display text-5xl mb-4">Get Akọ</h1>
        <p className="text-[var(--color-ink-muted)] text-lg mb-10">
          Free to download. Your circle is waiting.
        </p>
        <div className="flex justify-center">
          <DownloadButtons />
        </div>
      </Container>
    </div>
  );
}
