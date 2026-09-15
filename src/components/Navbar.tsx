// src/components/Navbar.tsx
//
// Mobile nav pattern deliberately modeled on whatsapp.com/security
// (§7 — explicit UX reference): hamburger opens a full-screen dark
// overlay, flat list of links with hairline dividers, chevron for
// links that go deeper, diagonal arrow for links that leave the
// site, and a pill-shaped primary CTA pinned at the bottom.
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronRight, ArrowUpRight } from "lucide-react";
import { Wordmark } from "./Wordmark";

const LINKS: { label: string; to: string; external?: boolean }[] = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Security", to: "/security" },
  { label: "Privacy", to: "/privacy" },
  { label: "FAQ", to: "/faq" },
  { label: "Help", to: "/help" },
  { label: "Download", to: "/download" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="site-dark sticky top-0 z-50 bg-[var(--color-canvas)] border-b border-[var(--color-border)]">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-4 h-16">
        <button
          onClick={() => setOpen(true)}
          aria-label="Open menu"
          className="text-[var(--color-ink)] p-2 -ml-2"
        >
          <Menu size={26} />
        </button>

        <Link to="/" className="tracking-tight">
          <Wordmark className="text-2xl" />
        </Link>

        <a
          href="/download"
          className="w-10 h-10 rounded-full bg-accent flex items-center justify-center text-[var(--color-canvas)]"
          aria-label="Get Akọ"
        >
          <ArrowUpRight size={20} />
        </a>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 bg-[var(--color-canvas)] flex flex-col">
          <div className="flex items-center justify-between px-4 h-16 border-b border-[var(--color-border)]">
            <button onClick={() => setOpen(false)} aria-label="Close menu" className="p-2 -ml-2 text-[var(--color-ink)]">
              <X size={26} />
            </button>
            <Wordmark className="text-2xl" />
            <a
              href="/download"
              className="w-10 h-10 rounded-full bg-accent flex items-center justify-center text-[var(--color-canvas)]"
            >
              <ArrowUpRight size={20} />
            </a>
          </div>

          <nav className="flex-1 overflow-y-auto px-4 py-2">
            {LINKS.map((link) => {
              const isActive = location.pathname === link.to;
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setOpen(false)}
                  className={`flex items-center justify-between py-5 border-b border-[var(--color-border)] text-3xl font-display ${
                    isActive ? "text-accent" : "text-[var(--color-ink)]"
                  }`}
                >
                  {link.label}
                  <ChevronRight size={22} className="text-accent" />
                </Link>
              );
            })}
          </nav>

          <div className="px-4 pb-8 pt-4">
            <a
              href="/download"
              onClick={() => setOpen(false)}
              className="flex items-center justify-center gap-2 w-full bg-accent text-[var(--color-canvas)] font-medium rounded-full py-4"
            >
              Get Akọ <ArrowUpRight size={18} />
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
