// src/components/AppIcon.tsx
//
// Icon-only brand mark, per the brand sheet's "ICON MARK" panel:
// green accent dash (upper-left), orange accent dash (upper-right),
// an orange ring, an orange dot beneath it — no text. This replaces
// the plain-text "Akọ" / two-tone wordmark that was standing in for
// branding everywhere; the icon is the actual asset.
export function AppIcon({ size = 32, rounded = true }: { size?: number; rounded?: boolean }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" aria-label="Akọ">
      {rounded && <rect width="100" height="100" rx="26" fill="#11251A" />}
      <rect x="26" y="18" width="10" height="22" rx="3" fill="#1E7A42" transform="rotate(-32 31 29)" />
      <rect x="64" y="18" width="10" height="22" rx="3" fill="#EF6C1A" transform="rotate(32 69 29)" />
      <circle cx="50" cy="58" r="15" stroke="#EF6C1A" strokeWidth="7" />
      <circle cx="50" cy="82" r="4.5" fill="#EF6C1A" />
    </svg>
  );
}
