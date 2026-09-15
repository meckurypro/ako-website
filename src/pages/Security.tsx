// src/pages/Security.tsx
import { Seo } from "../components/Seo";
import { Container } from "../components/Container";
import { AppIcon } from "../components/AppIcon";
import { ShieldCheck, Lock, Eye, Bell } from "lucide-react";

const CARDS = [
  {
    icon: Lock,
    title: "Private by default",
    body: "Your profile, posts, and messages are visible only to the people you choose.",
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

// Full page, one consistent dark theme — not a dark hero dropped
// into an otherwise light page. This is the WhatsApp reference
// pattern (§7): the whole surface commits to one tone.
export function Security() {
  return (
    <div className="site-dark bg-[var(--color-canvas)] min-h-screen">
      <Seo
        title="Secure by design"
        description="How Akọ keeps your account, conversations, and payments safe."
        path="/security"
      />
      <Container className="py-20 max-w-3xl">
        <AppIcon size={40} />
        <h1 className="font-display text-5xl leading-tight mt-6 mb-6">Secure by design</h1>
        <p className="text-[var(--color-ink-muted)] text-lg mb-14 max-w-xl">
          To keep you safe, we've built Akọ with security by default, tools to put you in
          control, and support when you need it.
        </p>

        <div className="grid gap-4">
          {CARDS.map(({ icon: Icon, title, body }) => (
            <div key={title} className="glass rounded-2xl p-6 flex gap-4">
              <Icon className="shrink-0 mt-1" size={24} style={{ color: "var(--color-flame)" }} />
              <div>
                <h2 className="font-display text-xl mb-1">{title}</h2>
                <p className="text-[var(--color-ink-muted)] text-sm">{body}</p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}
