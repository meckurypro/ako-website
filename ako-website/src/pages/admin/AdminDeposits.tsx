// src/pages/admin/AdminDeposits.tsx
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { supabase } from "../../lib/supabase";
import { AdminLayout } from "./AdminLayout";
import { Seo } from "../../components/Seo";

interface AdminDeposit {
  id: string;
  amount_usd: number;
  amount_ngn: number;
  status: "pending" | "success" | "failed";
  created_at: string;
  user_id: string;
}

function useAllDeposits() {
  return useQuery({
    queryKey: ["admin-deposits"],
    queryFn: async (): Promise<AdminDeposit[]> => {
      // Admins can see all rows here because admin_roles-gated RLS
      // policies allow it — same contract as the app repo's admin
      // pages (see useAdminWallet.ts there), not a new bypass.
      const { data, error } = await supabase
        .from("deposits")
        .select("id, amount_usd, amount_ngn, status, created_at, user_id")
        .order("created_at", { ascending: false })
        .limit(100);
      if (error) throw error;
      return data;
    },
  });
}

const STATUS_STYLE: Record<AdminDeposit["status"], string> = {
  success: "text-accent",
  pending: "text-[var(--color-ink-muted)]",
  failed: "text-danger",
};

export function AdminDeposits() {
  const { data: deposits, isLoading, error } = useAllDeposits();

  return (
    <AdminLayout>
      <Seo title="Deposits" description="Akọ admin — deposits." path="/admin/deposits" noindex />
      <h1 className="font-display text-3xl mb-6">Deposits</h1>

      {isLoading && <Loader2 className="animate-spin text-accent" size={24} />}
      {error && <p className="text-danger text-sm">Couldn't load deposits: {(error as Error).message}</p>}

      {deposits && (
        <div className="border border-[var(--color-border)] rounded-2xl overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-[var(--color-accent-soft)] text-left">
              <tr>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">User</th>
                <th className="px-4 py-3">USD</th>
                <th className="px-4 py-3">NGN</th>
                <th className="px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {deposits.map((d) => (
                <tr key={d.id} className="border-t border-[var(--color-border)]">
                  <td className="px-4 py-3">{new Date(d.created_at).toLocaleString()}</td>
                  <td className="px-4 py-3 font-mono text-xs">{d.user_id.slice(0, 8)}…</td>
                  <td className="px-4 py-3">${d.amount_usd.toFixed(2)}</td>
                  <td className="px-4 py-3">₦{d.amount_ngn.toLocaleString()}</td>
                  <td className={`px-4 py-3 font-medium ${STATUS_STYLE[d.status]}`}>{d.status}</td>
                </tr>
              ))}
              {deposits.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-4 py-8 text-center text-[var(--color-ink-muted)]">
                    No deposits yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </AdminLayout>
  );
}
