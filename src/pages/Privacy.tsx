// src/pages/Privacy.tsx
import { Seo } from "../components/Seo";

export function Privacy() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <Seo
        title="Privacy Policy"
        description="What Akọ collects, why, and how it's protected."
        path="/privacy"
      />
      <h1 className="font-display text-4xl mb-2">Privacy Policy</h1>
      <p className="text-[var(--color-ink-muted)] text-sm mb-10">Last updated: placeholder — replace with real effective date before launch.</p>

      <div className="space-y-8 text-[var(--color-ink-muted)] leading-relaxed">
        <section>
          <h2 className="font-display text-xl text-[var(--color-ink)] mb-2">What we collect</h2>
          <p>
            Account details you provide (name, email, profile info), content you post, and basic
            usage data needed to keep the app working and safe.
          </p>
        </section>
        <section>
          <h2 className="font-display text-xl text-[var(--color-ink)] mb-2">Payments</h2>
          <p>
            Wallet funding is processed by Paystack. Akọ never sees or stores your full card
            number — only the transaction result (success, amount, reference).
          </p>
        </section>
        <section>
          <h2 className="font-display text-xl text-[var(--color-ink)] mb-2">Your choices</h2>
          <p>
            You can export or delete your data from Settings in the app, or by contacting us
            directly through the Contact page.
          </p>
        </section>
      </div>

      <p className="text-xs text-[var(--color-ink-muted)] mt-12">
        This page is a placeholder structure — replace with reviewed legal copy before public
        launch (see architecture doc §121 legal versioning, §68 privacy page).
      </p>
    </div>
  );
}
