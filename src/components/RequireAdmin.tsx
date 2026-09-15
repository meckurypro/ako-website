// src/components/RequireAdmin.tsx
import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useIsAdmin } from "../hooks/useAdmin";

export function RequireAdmin({ children }: { children: ReactNode }) {
  const { user, loading: authLoading } = useAuth();
  const { data: isAdmin, isLoading: adminLoading } = useIsAdmin();

  if (authLoading || (user && adminLoading)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--color-canvas)]">
        <p className="text-[var(--color-ink-muted)]">Loading…</p>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/admin/login" replace />;
  }

  if (!isAdmin) {
    // Deliberately the same destination a non-admin app user would
    // hit — no "you're not authorized" page that confirms /admin
    // exists to someone probing it (§95 admin redirect protection).
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}
