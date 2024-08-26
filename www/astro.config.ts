import { defineConfig } from "astro/config";

import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import vercel from "@astrojs/vercel/serverless";
// import node from "@astrojs/node";
import starlight from "@astrojs/starlight";
import mdx from "@astrojs/mdx";

import icon from "astro-icon";

import theme from "./src/lib/code-theme.json";
import snippetMDX from "./plugins/generate-mdx";

// https://astro.build/config
export default defineConfig({
  integrations: [
    starlight({
      title: "ATMX",
      customCss: [
        "@fontsource/geist-sans/400.css",
        "@fontsource/geist-sans/500.css",
        "@fontsource/geist-sans/600.css",
        "@fontsource-variable/space-grotesk",
        "./src/styles/global.postcss",
      ],
      plugins: [snippetMDX],
      expressiveCode: {
        themes: [theme],
      },
      pagination: false,
      components: {
        MarkdownContent: "./src/components/MarkdownContent.astro",
        Head: "./src/components/Head.astro",
        Sidebar: "./src/components/Sidebar.astro",
        PageFrame: "./src/components/PageFrame.astro",
        PageTitle: "./src/components/PageTitle.astro",
        ContentPanel: "./src/components/ContentPanel.astro",
        SiteTitle: "./src/components/SiteTitle.astro",
        // Header: "./src/components/Header.astro",
      },
    }),
    tailwind({
      applyBaseStyles: false,
    }),
    react(),
    mdx(),
    icon({
      iconDir: "./src/assets/svg",
    }),
  ],
  prefetch: true,
  site: "https://atmx.dev",
  output: "hybrid",
  adapter: vercel({ webAnalytics: { enabled: true } }),
  // node({
  //   mode: "standalone",
  // }),
});
