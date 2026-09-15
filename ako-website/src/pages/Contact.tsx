// src/pages/Contact.tsx
import { useState } from "react";
import { Seo } from "../components/Seo";

export function Contact() {
  const [sent, setSent] = useState(false);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // No backend contact-form endpoint exists yet (§193) — this
    // opens the user's mail client as a safe, zero-infrastructure
    // fallback rather than silently dropping the message.
    window.location.href = `mailto:support@ako.app?subject=${encodeURIComponent(
      "Message from ako.app"
    )}&body=${encodeURIComponent(`${message}\n\nFrom: ${email}`)}`;
    setSent(true);
  }

  return (
    <div className="max-w-lg mx-auto px-4 py-16">
      <Seo title="Contact us" description="Get in touch with the Akọ team." path="/contact" />
      <h1 className="font-display text-4xl mb-3">Contact us</h1>
      <p className="text-[var(--color-ink-muted)] mb-10">
        We read everything. For account or payment issues, check the{" "}
        <a href="/help" className="text-accent underline">Help Center</a> first — it's often faster.
      </p>

      {sent ? (
        <p className="text-accent">Your mail app should be open — send it whenever you're ready.</p>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="email">Your email</label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border border-[var(--color-border)] px-4 py-3 bg-[var(--color-surface)]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="message">Message</label>
            <textarea
              id="message"
              required
              rows={5}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full rounded-xl border border-[var(--color-border)] px-4 py-3 bg-[var(--color-surface)]"
            />
          </div>
          <button type="submit" className="w-full bg-accent text-[var(--color-canvas)] rounded-xl py-3 font-medium">
            Send
          </button>
        </form>
      )}
    </div>
  );
}
