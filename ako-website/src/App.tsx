// src/App.tsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "./hooks/useAuth";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { RequireAdmin } from "./components/RequireAdmin";

import { Home } from "./pages/Home";
import { About } from "./pages/About";
import { Security } from "./pages/Security";
import { Privacy } from "./pages/Privacy";
import { Terms } from "./pages/Terms";
import { FAQ } from "./pages/FAQ";
import { Help } from "./pages/Help";
import { Contact } from "./pages/Contact";
import { Download } from "./pages/Download";
import { NotFound } from "./pages/NotFound";

import { Deposit } from "./pages/pay/Deposit";
import { Callback } from "./pages/pay/Callback";

import { AdminLogin } from "./pages/admin/AdminLogin";
import { AdminHome } from "./pages/admin/AdminHome";
import { AdminDeposits } from "./pages/admin/AdminDeposits";
import { AdminPlaceholder } from "./pages/admin/AdminPlaceholder";

const queryClient = new QueryClient();

// Marketing pages get the shared Navbar/Footer chrome. Payment and
// admin routes render their own minimal chrome (or none) — a
// payment page showing a "Home / About / FAQ" nav is exactly the
// kind of second-web-app drift §5 warns against.
function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
              <Route path="/" element={<MarketingLayout><Home /></MarketingLayout>} />
              <Route path="/about" element={<MarketingLayout><About /></MarketingLayout>} />
              <Route path="/security" element={<MarketingLayout><Security /></MarketingLayout>} />
              <Route path="/privacy" element={<MarketingLayout><Privacy /></MarketingLayout>} />
              <Route path="/terms" element={<MarketingLayout><Terms /></MarketingLayout>} />
              <Route path="/faq" element={<MarketingLayout><FAQ /></MarketingLayout>} />
              <Route path="/help" element={<MarketingLayout><Help /></MarketingLayout>} />
              <Route path="/contact" element={<MarketingLayout><Contact /></MarketingLayout>} />
              <Route path="/download" element={<MarketingLayout><Download /></MarketingLayout>} />

              {/* Payment surface — no marketing chrome, noindex (§22-23) */}
              <Route path="/pay/deposit" element={<Deposit />} />
              <Route path="/pay/callback" element={<Callback />} />

              {/* Admin — auth-gated, noindex (§22, §45) */}
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin" element={<RequireAdmin><AdminHome /></RequireAdmin>} />
              <Route path="/admin/deposits" element={<RequireAdmin><AdminDeposits /></RequireAdmin>} />
              <Route
                path="/admin/payouts"
                element={<RequireAdmin><AdminPlaceholder title="Payouts" sourceHook="usePayout" /></RequireAdmin>}
              />
              <Route
                path="/admin/exchange-rates"
                element={<RequireAdmin><AdminPlaceholder title="Exchange rates" sourceHook="useWalletRates" /></RequireAdmin>}
              />
              <Route
                path="/admin/feature-flags"
                element={<RequireAdmin><AdminPlaceholder title="Feature flags" sourceHook="useFeatureFlags" /></RequireAdmin>}
              />
              <Route
                path="/admin/moderation"
                element={<RequireAdmin><AdminPlaceholder title="Moderation" sourceHook="usePosts" /></RequireAdmin>}
              />
              <Route
                path="/admin/reports"
                element={<RequireAdmin><AdminPlaceholder title="Reports" sourceHook="useReports" /></RequireAdmin>}
              />

            <Route path="*" element={<MarketingLayout><NotFound /></MarketingLayout>} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </QueryClientProvider>
  );
}
