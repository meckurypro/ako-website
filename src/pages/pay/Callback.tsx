// src/pages/pay/Callback.tsx
//
// Landing page for Paystack's redirect after checkout. Same
// verify-deposit call as the app's DepositCallback — idempotent
// against the same deposit row, so it's safe even if the
// paystack-charge-webhook already credited the wallet first.
import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { CheckCircle2, XCircle, Loader2 } from "lucide-react";
import { Seo } from "../../components/Seo";
import { useVerifyDeposit } from "../../hooks/useDeposit";

export function Callback() {
  const [searchParams] = useSearchParams();
  const reference = searchParams.get("reference") ?? searchParams.get("trxref");
  const verifyDeposit = useVerifyDeposit();
  const [result, setResult] = useState<"pending" | "success" | "failed" | "error">("pending");
  const [creditedUsd, setCreditedUsd] = useState<number | null>(null);
  const attempted = useRef(false);

  useEffect(() => {
    if (!reference || attempted.current) return;
    attempted.current = true;

    verifyDeposit.mutate(reference, {
      onSuccess: (data) => {
        if (data.status === "success") {
          setResult("success");
          setCreditedUsd(data.amount_usd ?? null);
        } else if (data.status === "failed") {
          setResult("failed");
        } else {
          setResult("pending");
        }
      },
      onError: () => setResult("error"),
    });
  }, [reference, verifyDeposit]);

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <Seo title="Payment status" description="Confirming your payment." path="/pay/callback" noindex />
      <div className="max-w-sm w-full text-center">
        {verifyDeposit.isPending && (
          <>
            <Loader2 size={40} className="animate-spin text-accent mx-auto mb-4" />
            <p className="font-medium">Confirming your payment…</p>
            <p className="text-[var(--color-ink-muted)] text-sm mt-1">This only takes a moment.</p>
          </>
        )}

        {!verifyDeposit.isPending && result === "success" && (
          <>
            <CheckCircle2 size={44} className="text-accent mx-auto mb-4" />
            <p className="font-display text-xl mb-1">Wallet funded</p>
            <p className="text-[var(--color-ink-muted)] text-sm mb-6">
              {creditedUsd !== null
                ? `$${creditedUsd.toFixed(2)} has been added to your wallet.`
                : "Your deposit was successful."}
            </p>
            <p className="text-[var(--color-ink-muted)] text-sm">
              Open the Akọ app to see your updated balance.
            </p>
          </>
        )}

        {!verifyDeposit.isPending && (result === "failed" || result === "error") && (
          <>
            <XCircle size={44} className="text-danger mx-auto mb-4" />
            <p className="font-display text-xl mb-1">
              {result === "failed" ? "Payment not completed" : "Couldn't confirm payment"}
            </p>
            <p className="text-[var(--color-ink-muted)] text-sm">
              {result === "failed"
                ? "Your card or transfer wasn't successful. No funds were added."
                : "We couldn't verify this payment right now. If money left your account, it will still be credited automatically once confirmed."}
            </p>
          </>
        )}

        {!verifyDeposit.isPending && result === "pending" && !reference && (
          <p className="text-[var(--color-ink-muted)]">Missing payment reference.</p>
        )}
      </div>
    </div>
  );
}
