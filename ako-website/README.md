# Akọ Website

Public marketing site, payment surface, and admin console for Akọ — a
second frontend over the **same Supabase project** as the main Akọ
app (per `07_AKO_MARKETING_WEBSITE_PAYMENT_ADMIN_ARCHITECTURE.md`).
No new database, no duplicated business logic — it calls the exact
same `initiate-deposit` / `verify-deposit` edge functions and the
same `admin_roles`-gated RLS the app already uses.

## What's built

- **Marketing pages** — Home, About, Security, Privacy, Terms, FAQ,
  Help, Contact, Download, 404. WhatsApp-style mobile nav (full-screen
  dark overlay, per the architecture doc's explicit UX reference).
- **Payment surface** — `/pay/deposit` and `/pay/callback`, the real
  wallet-funding flow (Paystack via Supabase Edge Functions), not a
  mock. Requires the visitor to be signed in (same Supabase session
  as the app).
- **Admin console** — `/admin`, gated by `RequireAdmin` (same
  `admin_roles` check as the app). `/admin/deposits` is fully wired
  to real data as a working example; the rest of the sidebar
  (Payouts, Exchange rates, Feature flags, Moderation, Reports) are
  scaffolded routes with a note on which existing hook to port in —
  see `src/pages/admin/AdminPlaceholder.tsx`. Porting the app repo's
  `src/pages/admin/AdminX.tsx` files into this shell is a copy of
  each page's JSX onto the existing hook, not new backend work.
- **SEO basics** — `robots.txt` (disallows `/admin` and `/pay`),
  `sitemap.xml`, per-page canonical/OG tags via `src/components/Seo.tsx`.
- **Security headers** — `vercel.json` sets `X-Robots-Tag: noindex`
  on admin/payment routes, plus baseline headers (frame-options,
  content-type-options, referrer-policy) site-wide.

## ⚠️ One backend change this migration needs

`initiate-deposit` currently sets its Paystack `callback_url` to the
**app's** route (`/wallet/deposit/callback`). Now that the payment
page lives on this separate site, that edge function needs to
redirect to **this site's** `/pay/callback` instead — either by
hardcoding the new domain, or by accepting the origin/callback URL
as a parameter from the caller. This is a one-line change in the
`initiate-deposit` edge function (in the Akọ app's Supabase project,
not in this repo) — I didn't have access to that function's source
to edit it directly, so it needs a manual update before real
payments will round-trip correctly. Everything else in the payment
flow (session creation, verification, wallet crediting) is untouched.

## Local development

```bash
npm install
cp .env.example .env.local   # fill in real values
npm run dev
```

## Deploying on Vercel

1. Push this repo to GitHub, import it into Vercel as a new project.
2. Framework preset: **Vite**. Build command `npm run build`, output
   directory `dist` (Vercel usually detects this automatically).
3. Add the environment variables below under **Project Settings →
   Environment Variables** (Production + Preview).
4. Deploy. `vercel.json` already handles SPA routing (`/pay/deposit`
   etc. resolving to `index.html`) and the security headers.

### Environment variables — set on **Vercel**

These are the same Supabase project values the app repo already
uses — copy them from there, don't create a new Supabase project.

| Variable | Value | Notes |
|---|---|---|
| `VITE_SUPABASE_URL` | your Supabase project URL | same as app repo |
| `VITE_SUPABASE_ANON_KEY` | your Supabase anon/public key | same as app repo — safe client-side, RLS enforces access |
| `VITE_SITE_URL` | e.g. `https://ako.app` | used for canonical/OG tags and the sitemap |
| `VITE_APP_STORE_URL` | your App Store listing URL | optional — badge hides until set |
| `VITE_PLAY_STORE_URL` | your Play Store listing URL | optional — badge hides until set |

### Environment variables — set on **Supabase**, not Vercel

Paystack's secret key never belongs in a frontend build, so it isn't
a Vercel env var at all. It's already configured as a **Supabase
Edge Function secret** on the same project the app uses:

```bash
supabase secrets set PAYSTACK_SECRET_KEY=sk_live_xxxxx
```

(or set it in the Supabase dashboard under **Edge Functions →
Secrets**). If it's already set for the app's `initiate-deposit`/
`verify-deposit` functions, there's nothing new to add — this site
calls those same functions.

## What wasn't fully built out

The architecture doc is ~250 sections covering everything from CSP
headers to legal-copy versioning to a 3D phone mockup. This repo
implements the structural core — real payment flow, real admin auth,
SEO scaffolding, all pages present — but:

- Legal copy (Privacy/Terms) is placeholder structure, not reviewed text.
- The hero's phone mockup is a lightweight CSS version, not the 3D
  one described in §12 — swap it in behind the same layout slot
  whenever that's ready, no other changes needed.
- Only Deposits is fully ported into the new Admin console; the other
  ~15 admin pages in the app repo follow the identical pattern (same
  hooks, same `RequireAdmin` gate) and are the natural next step.
