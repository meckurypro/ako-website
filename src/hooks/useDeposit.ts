// src/hooks/useDeposit.ts
//
// Calls the SAME Supabase Edge Functions the app already uses
// (initiate-deposit / verify-deposit) — no new payment logic lives
// here, per §141 "no duplicate business logic". This page is just
// a second, public front door to that existing flow, per §25-27.
//
// IMPORTANT — one backend change this migration needs:
// initiate-deposit's Paystack callback_url currently points back
// into the app (see the app repo's DepositCallback.tsx comment:
// "/wallet/deposit/callback"). Now that the payment surface lives
// on this site, that edge function needs to redirect to THIS
// site's /pay/callback instead (or accept an origin/callback_url
// param and use it) — see README.md "Backend change required".
import { useMutation } from "@tanstack/react-query";
import { supabase } from "../lib/supabase";

interface InitiateDepositResult {
  deposit_id: string;
  authorization_url: string;
  reference: string;
  amount_usd: number;
  amount_ngn: number;
  exchange_rate: number;
}

export function useInitiateDeposit() {
  return useMutation({
    mutationFn: async (amount_usd: number): Promise<InitiateDepositResult> => {
      const { data, error } = await supabase.functions.invoke("initiate-deposit", {
        body: { amount_usd },
      });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);
      return data;
    },
  });
}

export type DepositVerifyStatus = "success" | "failed" | "pending";

export function useVerifyDeposit() {
  return useMutation({
    mutationFn: async (reference: string): Promise<{ status: DepositVerifyStatus; amount_usd?: number }> => {
      const { data, error } = await supabase.functions.invoke("verify-deposit", {
        body: { reference },
      });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);
      return data;
    },
  });
}
