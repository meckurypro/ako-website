// src/pages/admin/AdminLayout.tsx
import type { ReactNode } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { LogOut } from "lucide-react";
import { supabase } from "../../lib/supabase";
import { AppIcon } from "../../components/AppIcon";

const NAV = [
  { label: "Overview", to: "/admin" },
  { label: "Deposits", to: "/admin/deposits" },
  { label: "Payouts", to: "/admin/payouts" },
  { label: "Exchange rates", to: "/admin/exchange-rates" },
  { label: "Feature flags", to: "/admin/feature-flags" },
  { label: "Moderation", to: "/admin/moderation" },
  { label: "Reports", to: "/admin/reports" },
];

export function AdminLayout({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  const location = useLocation();

  async function handleSignOut() {
    await supabase.auth.signOut();
    navigate("/admin/login");
  }

  return (
    <div className="min-h-screen flex bg-[var(--color-canvas)]">
      <aside className="w-56 shrink-0 border-r border-[var(--color-border)] p-4 flex flex-col">
        <div className="mb-6 px-2 flex items-center gap-2">
          <AppIcon size={24} />
          <span className="text-sm text-[var(--color-ink-muted)]">Admin</span>
        </div>
        <nav className="flex-1 space-y-1">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={`block rounded-lg px-3 py-2 text-sm ${
                location.pathname === item.to
                  ? "bg-accent-soft text-accent font-medium"
                  : "text-[var(--color-ink-muted)] hover:bg-[var(--color-accent-soft)]"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <button
          onClick={handleSignOut}
          className="flex items-center gap-2 text-sm text-[var(--color-ink-muted)] px-3 py-2 hover:text-danger"
        >
          <LogOut size={16} /> Sign out
        </button>
      </aside>
      <main className="flex-1 p-8 overflow-y-auto">{children}</main>
    </div>
  );
}
