// src/pages/admin/AdminHome.tsx
import { AdminLayout } from "./AdminLayout";
import { Seo } from "../../components/Seo";

export function AdminHome() {
  return (
    <AdminLayout>
      <Seo title="Admin overview" description="Akọ admin console." path="/admin" noindex />
      <h1 className="font-display text-3xl mb-2">Overview</h1>
      <p className="text-[var(--color-ink-muted)] mb-8">
        This console reads the same Supabase project as the app — no separate admin database.
      </p>
      <div className="rounded-2xl border border-[var(--color-border)] p-6 max-w-xl">
        <p className="text-sm text-[var(--color-ink-muted)]">
          Deposits is fully wired as a working example. The rest of the sections in the sidebar
          are scaffolded routes, ready to receive the corresponding page ported over from the app
          repo's <code className="text-xs">src/pages/admin/</code> — same hooks
          (<code className="text-xs">useAdminWallet</code>, <code className="text-xs">usePayout</code>,{" "}
          <code className="text-xs">useFeatureFlags</code>, <code className="text-xs">useReports</code>,
          etc.), unchanged, since this console shares the exact backend contract.
        </p>
      </div>
    </AdminLayout>
  );
}
