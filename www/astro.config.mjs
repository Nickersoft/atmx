import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import node from "@astrojs/node";

import vercel from "@astrojs/vercel/serverless";

// https://astro.build/config
export default defineConfig({
  integrations: [
    react(),
    tailwind({
      applyBaseStyles: false,
    }),
  ],
  vite: {
    ssr: {
      external: ["ts-morph"],
    },
  },
  site: "https://atmx.dev",
  output: "hybrid",
  adapter: vercel({ webAnalytics: true }),
  // node({ mode: "standalone" }),
});
