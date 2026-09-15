// src/pages/Help.tsx
import { Link } from "react-router-dom";
import { Seo } from "../components/Seo";

const TOPICS = [
  { title: "Getting started", body: "Creating an account, finding people, setting up your profile." },
  { title: "Wallet & payments", body: "Funding your wallet, withdrawals, and what to do if a payment fails." },
  { title: "Privacy & safety", body: "Blocking, reporting, and controlling who sees your content." },
  { title: "Account", body: "Changing your email, password resets, and deleting your account." },
];

export function Help() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <Seo title="Help Center" description="Guides and answers for using Akọ." path="/help" />
      <h1 className="font-display text-4xl mb-3">Help Center</h1>
      <p className="text-[var(--color-ink-muted)] mb-12">
        Browse a topic below, check the <Link to="/faq" className="text-accent underline">FAQ</Link>, or{" "}
        <Link to="/contact" className="text-accent underline">contact us</Link> directly.
      </p>
      <div className="grid sm:grid-cols-2 gap-6">
        {TOPICS.map((t) => (
          <div key={t.title} className="border border-[var(--color-border)] rounded-2xl p-6">
            <h2 className="font-display text-xl mb-2">{t.title}</h2>
            <p className="text-[var(--color-ink-muted)] text-sm">{t.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
