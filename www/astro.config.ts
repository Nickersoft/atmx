import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
// import vercel from "@astrojs/vercel/serverless";
import node from "@astrojs/node";
import starlight from "@astrojs/starlight";

import mdx from "@astrojs/mdx";
import theme from "./src/lib/code-theme.json";

// https://astro.build/config
export default defineConfig({
  integrations: [
    starlight({
      title: "ATMX",
      customCss: ["@fontsource-variable/inter", "./src/styles/global.css"],
      expressiveCode: {
        themes: [theme],
      },
      components: {
        Head: "./src/components/Head.astro",
        Sidebar: "./src/components/Sidebar.astro",
        PageFrame: "./src/components/PageFrame.astro",
        PageTitle: "./src/components/PageTitle.astro",
        // Header: "./src/components/Header.astro",
      },
    }),
    tailwind({
      applyBaseStyles: false,
    }),
    react(),
    mdx(),
  ],
  prefetch: true,
  site: "https://atmx.dev",
  output: "hybrid",
  adapter:
    //  vercel(),
    node({ mode: "standalone" }),
});
