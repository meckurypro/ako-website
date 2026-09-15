// src/pages/Security.tsx
import { Seo } from "../components/Seo";
import { ShieldCheck, Lock, Eye, Bell } from "lucide-react";

const CARDS = [
  {
    icon: Lock,
    title: "Private by default",
    body: "Your profile, posts, and messages are visible only to the people you choose. No public-by-default surprises.",
  },
  {
    icon: Eye,
    title: "You control who sees what",
    body: "Block, mute, or restrict anyone at any time. Blocking is quiet — the other person isn't notified.",
  },
  {
    icon: Bell,
    title: "Report anything, anytime",
    body: "Every post, message, and profile can be reported directly to our team for review.",
  },
  {
    icon: ShieldCheck,
    title: "Payments handled by Paystack",
    body: "Wallet funding runs through Paystack's PCI-compliant checkout — Akọ never stores your card details.",
  },
];

export function Security() {
  return (
    <div className="site-dark bg-[var(--color-canvas)]">
      <Seo
        title="Secure by design"
        description="How Akọ keeps your account, conversations, and payments safe."
        path="/security"
      />
      <div className="max-w-3xl mx-auto px-4 py-20 text-[var(--color-ink)]">
        <h1 className="font-display text-5xl leading-tight mb-6">
          <span className="text-accent">Secure</span> by design
        </h1>
        <p className="text-[var(--color-ink-muted)] text-lg mb-16 max-w-xl">
          To keep you safe, we've designed Akọ with world-class security, built tools to put you
          in control, and we're there to support you when you need it.
        </p>

        <div className="grid gap-10">
          {CARDS.map(({ icon: Icon, title, body }) => (
            <div key={title} className="flex gap-4">
              <Icon className="text-accent shrink-0 mt-1" size={28} />
              <div>
                <h2 className="font-display text-2xl mb-2">{title}</h2>
                <p className="text-[var(--color-ink-muted)]">{body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
