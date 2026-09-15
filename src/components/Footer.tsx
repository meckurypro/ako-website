// src/components/Footer.tsx
import { Link } from "react-router-dom";
import { AppIcon } from "./AppIcon";
import { Container } from "./Container";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-dark bg-[var(--color-canvas)] text-[var(--color-ink)] border-t border-[var(--color-border)] mt-24">
      <Container className="py-12 grid grid-cols-2 md:grid-cols-4 gap-8 text-sm">
        <div>
          <p className="text-[var(--color-ink-muted)] font-medium mb-3">What we do</p>
          <ul className="space-y-2">
            <li><Link to="/about" className="hover:text-flame">About</Link></li>
            <li><Link to="/security" className="hover:text-flame">Security</Link></li>
            <li><Link to="/download" className="hover:text-flame">Download</Link></li>
          </ul>
        </div>
        <div>
          <p className="text-[var(--color-ink-muted)] font-medium mb-3">Legal</p>
          <ul className="space-y-2">
            <li><Link to="/privacy" className="hover:text-flame">Privacy</Link></li>
            <li><Link to="/terms" className="hover:text-flame">Terms</Link></li>
          </ul>
        </div>
        <div>
          <p className="text-[var(--color-ink-muted)] font-medium mb-3">Need help?</p>
          <ul className="space-y-2">
            <li><Link to="/faq" className="hover:text-flame">FAQ</Link></li>
            <li><Link to="/help" className="hover:text-flame">Help Center</Link></li>
            <li><Link to="/contact" className="hover:text-flame">Contact</Link></li>
          </ul>
        </div>
        <div>
          <AppIcon size={30} />
        </div>
      </Container>
      <div className="border-t border-[var(--color-border)] py-6 text-center text-xs text-[var(--color-ink-muted)]">
        {year} © Akọ
      </div>
    </footer>
  );
}
