// src/components/Footer.tsx
import { Link } from "react-router-dom";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-dark bg-[var(--color-canvas)] text-[var(--color-ink)] mt-24">
      <div className="max-w-6xl mx-auto px-4 py-12 grid grid-cols-2 md:grid-cols-4 gap-8 text-sm">
        <div>
          <p className="text-[var(--color-ink-muted)] font-medium mb-3">What we do</p>
          <ul className="space-y-2">
            <li><Link to="/about" className="hover:text-accent">About</Link></li>
            <li><Link to="/security" className="hover:text-accent">Security</Link></li>
            <li><Link to="/download" className="hover:text-accent">Download</Link></li>
          </ul>
        </div>
        <div>
          <p className="text-[var(--color-ink-muted)] font-medium mb-3">Legal</p>
          <ul className="space-y-2">
            <li><Link to="/privacy" className="hover:text-accent">Privacy</Link></li>
            <li><Link to="/terms" className="hover:text-accent">Terms</Link></li>
          </ul>
        </div>
        <div>
          <p className="text-[var(--color-ink-muted)] font-medium mb-3">Need help?</p>
          <ul className="space-y-2">
            <li><Link to="/faq" className="hover:text-accent">FAQ</Link></li>
            <li><Link to="/help" className="hover:text-accent">Help Center</Link></li>
            <li><Link to="/contact" className="hover:text-accent">Contact</Link></li>
          </ul>
        </div>
        <div>
          <p className="text-[var(--color-ink-muted)] font-medium mb-3">Akọ</p>
          <p className="font-display text-2xl text-accent">Akọ</p>
        </div>
      </div>
      <div className="border-t border-[var(--color-border)] py-6 text-center text-xs text-[var(--color-ink-muted)]">
        {year} © Akọ
      </div>
    </footer>
  );
}
