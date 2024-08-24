import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import node from "@astrojs/node";
import vercel from "@astrojs/vercel/serverless";
import starlight from "@astrojs/starlight";

import mdx from "@astrojs/mdx";

// https://astro.build/config
export default defineConfig({
  integrations: [react(), tailwind({
    applyBaseStyles: false
  }), starlight({
    title: "ATMX",
    customCss: ["./src/styles/global.css"]
  }), mdx()],
  site: "https://atmx.dev",
  output: "hybrid",
  adapter: vercel({
    webAnalytics: true
  })
  // node({ mode: "standalone" }),
});