// src/components/Navbar.tsx
//
// Glass sticky bar, icon-only brand mark (no wordmark text), full-
// screen mobile overlay modeled on whatsapp.com's actual pattern:
// flat list of links with hairline dividers, chevron for links that
// go deeper, one pill CTA pinned at the bottom. Flat colors only —
// no gradient, no color fill beyond the CTA pill and the icon itself.
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronRight, ArrowUpRight } from "lucide-react";
import { AppIcon } from "./AppIcon";
import { Container } from "./Container";

const LINKS: { label: string; to: string }[] = [
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
    <header className="site-dark sticky top-0 z-50 glass">
      <Container className="flex items-center justify-between h-16">
        <button onClick={() => setOpen(true)} aria-label="Open menu" className="text-[var(--color-ink)] p-2 -ml-2">
          <Menu size={24} />
        </button>

        <Link to="/" aria-label="Akọ home">
          <AppIcon size={34} />
        </Link>

        <a
          href="/download"
          className="w-9 h-9 rounded-full bg-accent flex items-center justify-center text-white"
          aria-label="Get Akọ"
        >
          <ArrowUpRight size={18} />
        </a>
      </Container>

      {open && (
        <div className="site-dark fixed inset-0 z-50 bg-[var(--color-canvas)] flex flex-col">
          <Container className="flex items-center justify-between h-16 border-b border-[var(--color-border)]">
            <button onClick={() => setOpen(false)} aria-label="Close menu" className="p-2 -ml-2 text-[var(--color-ink)]">
              <X size={24} />
            </button>
            <AppIcon size={30} />
            <a
              href="/download"
              className="w-9 h-9 rounded-full bg-accent flex items-center justify-center text-white"
            >
              <ArrowUpRight size={18} />
            </a>
          </Container>

          <nav className="flex-1 overflow-y-auto">
            <Container>
              {LINKS.map((link) => {
                const isActive = location.pathname === link.to;
                return (
                  <Link
                    key={link.to}
                    to={link.to}
                    onClick={() => setOpen(false)}
                    className={`flex items-center justify-between py-5 border-b border-[var(--color-border)] text-2xl font-display ${
                      isActive ? "text-[var(--color-ink)]" : "text-[var(--color-ink-muted)]"
                    }`}
                  >
                    {link.label}
                    <ChevronRight size={20} className="text-[var(--color-ink-muted)]" />
                  </Link>
                );
              })}
            </Container>
          </nav>

          <Container className="pb-8 pt-4">
            <a
              href="/download"
              onClick={() => setOpen(false)}
              className="flex items-center justify-center gap-2 w-full bg-accent text-white font-medium rounded-full py-4"
            >
              Get Akọ <ArrowUpRight size={18} />
            </a>
          </Container>
        </div>
      )}
    </header>
  );
}
