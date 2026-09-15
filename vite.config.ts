import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    // Route-level code splitting: marketing / payment / admin never
    // ship in the same chunk (see architecture doc §187-189). Vite's
    // default per-dynamic-import chunking already achieves this since
    // every page below is lazy-imported in App.tsx — nothing extra
    // needed here, just documenting the intent.
    sourcemap: false,
  },
});
