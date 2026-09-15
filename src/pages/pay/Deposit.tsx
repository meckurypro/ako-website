// src/pages/pay/Deposit.tsx
//
// Public payment surface (§25-29): this is now the front door for
// wallet funding, not a page inside the app. Someone can land here
// from a link without the app installed; if they're not logged in
// we ask them to sign in through the app first rather than building
// a second signup flow here (§5).
import { useMemo, useState } from "react";
import { AlertCircle, Loader2, LogIn } from "lucide-react";
import { Seo } from "../../components/Seo";
import { useAuth } from "../../hooks/useAuth";
import { useInitiateDeposit } from "../../hooks/useDeposit";

const PRESET_AMOUNTS = [5, 10, 25, 50, 100];
const MINIMUM_DEPOSIT_USD = 1;

export function Deposit() {
  const { user, loading } = useAuth();
  const initiateDeposit = useInitiateDeposit();

  const [selectedPreset, setSelectedPreset] = useState<number | null>(10);
  const [customAmount, setCustomAmount] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const amountUsd = customAmount ? Number(customAmount) : selectedPreset ?? 0;

  const displayAmount = useMemo(
    () => (amountUsd ? `$${amountUsd.toFixed(2)}` : "—"),
    [amountUsd]
  );

  function selectPreset(usd: number) {
    setSelectedPreset(usd);
    setCustomAmount("");
    setErrorMessage(null);
  }

  function handleCustomChange(value: string) {
    if (value === "" || /^\d*\.?\d{0,2}$/.test(value)) {
      setCustomAmount(value);
      setSelectedPreset(null);
      setErrorMessage(null);
    }
  }

  async function handleContinue() {
    setErrorMessage(null);
    if (!amountUsd || amountUsd < MINIMUM_DEPOSIT_USD) {
      setErrorMessage(`Minimum deposit is $${MINIMUM_DEPOSIT_USD}.`);
      return;
    }
    try {
      const result = await initiateDeposit.mutateAsync(amountUsd);
      // Paystack's own hosted checkout takes it from here — card,
      // bank transfer, or USSD — then redirects to /pay/callback.
      window.location.href = result.authorization_url;
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : "Couldn't start payment.");
    }
  }

  if (loading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <Loader2 className="animate-spin text-accent" size={32} />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="max-w-sm mx-auto px-4 py-24 text-center">
        <Seo title="Fund your wallet" description="Sign in to fund your Akọ wallet." path="/pay/deposit" noindex />
        <LogIn className="mx-auto text-accent mb-4" size={32} />
        <h1 className="font-display text-2xl mb-2">Sign in first</h1>
        <p className="text-[var(--color-ink-muted)] mb-6">
          Open Akọ, sign in, then come back to this link to fund your wallet.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto px-4 py-16">
      <Seo title="Fund your wallet" description="Add money to your Akọ wallet." path="/pay/deposit" noindex />
      <h1 className="font-display text-3xl mb-2">Fund your wallet</h1>
      <p className="text-[var(--color-ink-muted)] text-sm mb-8">
        Card, bank transfer, or USSD — powered by Paystack.
      </p>

      <div className="grid grid-cols-3 gap-2 mb-4">
        {PRESET_AMOUNTS.map((amt) => (
          <button
            key={amt}
            onClick={() => selectPreset(amt)}
            className={`rounded-xl py-3 font-medium border ${
              selectedPreset === amt
                ? "bg-accent text-[var(--color-canvas)] border-accent"
                : "border-[var(--color-border)] text-[var(--color-ink)]"
            }`}
          >
            ${amt}
          </button>
        ))}
      </div>

      <input
        type="text"
        inputMode="decimal"
        placeholder="Custom amount (USD)"
        value={customAmount}
        onChange={(e) => handleCustomChange(e.target.value)}
        className="w-full rounded-xl border border-[var(--color-border)] px-4 py-3 mb-6 bg-[var(--color-surface)]"
      />

      {errorMessage && (
        <div className="flex items-center gap-2 text-danger text-sm mb-4">
          <AlertCircle size={16} /> {errorMessage}
        </div>
      )}

      <button
        onClick={handleContinue}
        disabled={initiateDeposit.isPending}
        className="w-full bg-accent text-[var(--color-canvas)] rounded-xl py-3 font-medium disabled:opacity-60 flex items-center justify-center gap-2"
      >
        {initiateDeposit.isPending ? (
          <Loader2 className="animate-spin" size={18} />
        ) : (
          `Continue — ${displayAmount}`
        )}
      </button>
    </div>
  );
}
