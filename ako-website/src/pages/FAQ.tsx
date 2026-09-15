// src/pages/FAQ.tsx
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Seo } from "../components/Seo";

const FAQS = [
  { q: "Is Akọ free?", a: "Yes — creating an account and using the feed, messaging, and projects is free. Wallet funding and some promotions are optional paid features." },
  { q: "How do I fund my wallet?", a: "Open Wallet in the app, tap Fund, choose an amount, and pay by card, bank transfer, or USSD via Paystack." },
  { q: "Can people find my phone number?", a: "No. Your phone number is never searchable or shown to other users." },
  { q: "How do I delete my account?", a: "Settings → Account → Delete account, in the app. See the Help Center for what's removed and what's retained." },
  { q: "Is Akọ available on iOS and Android?", a: "See the Download page for current availability." },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="max-w-2xl mx-auto px-4 py-16">
      <Seo title="FAQ" description="Answers to common questions about using Akọ." path="/faq" />
      <h1 className="font-display text-4xl mb-10">Frequently asked questions</h1>
      <div className="divide-y divide-[var(--color-border)]">
        {FAQS.map((item, i) => (
          <div key={item.q}>
            <button
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              className="w-full flex items-center justify-between py-5 text-left"
              aria-expanded={openIndex === i}
            >
              <span className="font-medium text-lg">{item.q}</span>
              <ChevronDown
                size={20}
                className={`text-accent transition-transform shrink-0 ml-4 ${openIndex === i ? "rotate-180" : ""}`}
              />
            </button>
            {openIndex === i && (
              <p className="text-[var(--color-ink-muted)] pb-5 -mt-2">{item.a}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
