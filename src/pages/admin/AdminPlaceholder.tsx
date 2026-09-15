// src/pages/admin/AdminPlaceholder.tsx
import { AdminLayout } from "./AdminLayout";
import { Seo } from "../../components/Seo";

export function AdminPlaceholder({ title, sourceHook }: { title: string; sourceHook: string }) {
  return (
    <AdminLayout>
      <Seo title={title} description={`Akọ admin — ${title}.`} path="/admin" noindex />
      <h1 className="font-display text-3xl mb-4">{title}</h1>
      <div className="rounded-2xl border border-dashed border-[var(--color-border)] p-6 max-w-xl">
        <p className="text-[var(--color-ink-muted)] text-sm">
          Not yet migrated. Port the matching page from the app repo's{" "}
          <code className="text-xs">src/pages/admin/</code> — it already calls{" "}
          <code className="text-xs">{sourceHook}</code>, which works unchanged here since both
          repos share the same Supabase project and RLS-enforced <code className="text-xs">admin_roles</code> check.
        </p>
      </div>
    </AdminLayout>
  );
}
