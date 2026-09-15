// src/lib/supabase.ts
import { createClient } from "@supabase/supabase-js";

// Same Supabase project as the Akọ app — one backend, two
// frontends. Copy these from the app repo's Vercel/Supabase env,
// they're identical values.
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    "Missing Supabase environment variables. Copy .env.example to .env.local and fill in your project values."
  );
}

// Only the anon key ever lives here — real access control is RLS
// policies + the admin_roles check in RequireAdmin, same model as
// the app repo. No service-role key, no Paystack secret: this is a
// browser bundle, so nothing goes in here that isn't safe to expose.
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
