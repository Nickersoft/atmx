import { defineConfig } from "astro/config";

import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import vercel from "@astrojs/vercel/serverless";
// import node from "@astrojs/node";
import starlight from "@astrojs/starlight";
import mdx from "@astrojs/mdx";
import Icons from "unplugin-icons/vite";

import theme from "./src/lib/code-theme.json";
import snippetMDX from "./plugins/generate-mdx";

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [
      Icons({
        compiler: "jsx",
        jsx: "react",
      }),
    ],
  },
  integrations: [
    starlight({
      title: "ATMX",
      customCss: [
        "@fontsource/geist-sans",
        "@fontsource/geist-mono",
        "@fontsource-variable/space-grotesk",
        "./src/styles/global.postcss",
      ],
      social: {
        github: "https://github.com/Nickersoft/atmx",
      },
      sidebar: [
        {
          label: "Getting Started",
          collapsed: false,
          autogenerate: {
            directory: "getting-started",
          },
        },
      ],
      plugins: [snippetMDX],
      expressiveCode: {
        themes: [theme],
        styleOverrides: {
          borderRadius: "calc(var(--radius) - 2px)",
          borderWidth: "1px",
          borderColor: "hsl(var(--border-foreground))",
          codeBackground: "hsl(var(--card))",
          frames: {
            shadowColor: "transparent",
            inlineButtonBackground: "transparent",
            inlineButtonBorder: "0px",
            inlineButtonBackgroundIdleOpacity: "0.5",
          },
        },
      },
      pagination: false,
      pagefind: false,
      components: {
        MarkdownContent: "./src/components/MarkdownContent.astro",
        Sidebar: "./src/components/Sidebar.astro",
        PageFrame: "./src/components/PageFrame.astro",
        PageTitle: "./src/components/PageTitle.astro",
        Header: "./src/components/Header.astro",
        ContentPanel: "./src/components/ContentPanel.astro",
        Hero: "./src/components/Hero.astro",
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
  adapter: vercel({ webAnalytics: { enabled: true } }),
  // node({
  //   mode: "standalone",
  // }),
});
