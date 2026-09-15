// src/pages/Terms.tsx
import { Seo } from "../components/Seo";

export function Terms() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <Seo title="Terms of Service" description="The terms that govern using Akọ." path="/terms" />
      <h1 className="font-display text-4xl mb-2">Terms of Service</h1>
      <p className="text-[var(--color-ink-muted)] text-sm mb-10">
        Last updated: placeholder — replace with real effective date before launch.
      </p>
      <div className="space-y-8 text-[var(--color-ink-muted)] leading-relaxed">
        <section>
          <h2 className="font-display text-xl text-[var(--color-ink)] mb-2">Using Akọ</h2>
          <p>
            You must be old enough to form a binding agreement in your country and agree to use
            Akọ in line with our community guidelines, available in-app.
          </p>
        </section>
        <section>
          <h2 className="font-display text-xl text-[var(--color-ink)] mb-2">Wallet & payments</h2>
          <p>
            Wallet deposits are processed through Paystack. Refunds and disputes follow the
            process described on the Help page.
          </p>
        </section>
      </div>
      <p className="text-xs text-[var(--color-ink-muted)] mt-12">
        Placeholder structure — replace with reviewed legal copy before public launch.
      </p>
    </div>
  );
}
