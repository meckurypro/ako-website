// src/components/Container.tsx
//
// Single source of truth for page width. Previously the nav, footer,
// and individual page sections each hardcoded their own
// "max-w-6xl mx-auto px-4" — easy to drift out of sync (which is
// exactly what happened). Everything now goes through this one
// component instead.
export function Container({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={`max-w-6xl mx-auto px-4 ${className}`}>{children}</div>;
}
