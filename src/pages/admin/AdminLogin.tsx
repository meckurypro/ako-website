// src/pages/admin/AdminLogin.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { supabase } from "../../lib/supabase";
import { Seo } from "../../components/Seo";

export function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);

    if (signInError) {
      // Deliberately generic — never confirm whether the email
      // exists or whether it's the password vs. the admin check
      // that failed (§45 admin authorization).
      setError("Invalid credentials or not authorized.");
      return;
    }
    navigate("/admin");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--color-canvas)] px-4">
      <Seo title="Admin sign in" description="Akọ admin console." path="/admin/login" noindex />
      <form onSubmit={handleSubmit} className="w-full max-w-sm">
        <h1 className="font-display text-2xl mb-6">Akọ Admin</h1>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1" htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-xl border border-[var(--color-border)] px-4 py-3 bg-[var(--color-surface)]"
          />
        </div>
        <div className="mb-6">
          <label className="block text-sm font-medium mb-1" htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-xl border border-[var(--color-border)] px-4 py-3 bg-[var(--color-surface)]"
          />
        </div>
        {error && <p className="text-danger text-sm mb-4">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-accent text-[var(--color-canvas)] rounded-xl py-3 font-medium flex items-center justify-center gap-2 disabled:opacity-60"
        >
          {loading ? <Loader2 className="animate-spin" size={18} /> : "Sign in"}
        </button>
      </form>
    </div>
  );
}
