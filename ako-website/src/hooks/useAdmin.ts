// src/hooks/useAdmin.ts
import { useQuery } from "@tanstack/react-query";
import { supabase } from "../lib/supabase";
import { useAuth } from "./useAuth";

/**
 * Same check as the app repo's useIsAdmin: queries admin_roles
 * directly and relies on RLS to return nothing for non-admins
 * regardless of the filter. Kept identical on purpose — this is
 * the shared backend contract (§45, §52), not a new authorization
 * path invented for the website.
 */
export function useIsAdmin() {
  const { user } = useAuth();

  return useQuery({
    queryKey: ["is-admin", user?.id],
    queryFn: async () => {
      if (!user) return false;
      const { data } = await supabase
        .from("admin_roles")
        .select("role")
        .eq("user_id", user.id)
        .maybeSingle();
      return !!data;
    },
    enabled: !!user,
  });
}
