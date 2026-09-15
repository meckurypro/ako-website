// src/components/Wordmark.tsx
//
// The brand mark is genuinely two-tone — green for "àk", orange for
// "ọ́" — not a single accent color applied to plain text. A flat
// text-accent "Akọ" (what every page used before) loses exactly the
// warmth the logo has. This renders that split directly.
export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`font-display ${className}`}>
      <span style={{ color: "var(--color-accent)" }}>àk</span>
      <span style={{ color: "var(--color-flame)" }}>ọ́</span>
    </span>
  );
}
