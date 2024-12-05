import { defineConfig } from "astro/config";

import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import vercel from "@astrojs/vercel";
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
    ssr: {
      noExternal: ["@atmx-org/registry"],
    },
  },
  integrations: [
    starlight({
      title: "ATMX",
      description: "Utilities, React hooks, and more in a single command.",
      customCss: [
        "@fontsource-variable/inter",
        "@fontsource/geist-mono",
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
        // themes: ["starlight-dark"],
        themes: [theme, "starlight-light"],
        styleOverrides: {
          borderRadius: "calc(var(--radius) - 2px)",
          borderWidth: "1px",
          borderColor: "hsl(var(--border-foreground))",
          codeBackground: "hsl(var(--card))",
          frames: {
            terminalBackground: "hsl(var(--card))",
            terminalTitlebarBackground: "hsl(var(--card))",
            terminalTitlebarBorderBottomColor: "hsl(var(--border-foreground))",
            terminalTitlebarForeground: "hsl(var(--foreground))",
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
        Head: "./src/components/Head.astro",
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
  output: "static",
  adapter: vercel({ webAnalytics: { enabled: true } }),
  // node({
  //   mode: "standalone",
  // }),
});
