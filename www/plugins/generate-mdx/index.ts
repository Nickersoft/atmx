import { generateSnippetMDX } from "./utils";

import type { StarlightPlugin } from "@astrojs/starlight/types";

export default {
  name: "mdx-generator",
  hooks: {
    async setup({ updateConfig, config }) {
      await generateSnippetMDX();

      updateConfig({
        sidebar: [
          ...(config.sidebar ?? []),
          {
            label: "Helpers",
            collapsed: false,
            autogenerate: {
              directory: "generated/helpers",
              collapsed: true,
            },
          },
          {
            label: "Hooks",
            collapsed: false,
            autogenerate: {
              directory: "generated/hooks",
              collapsed: true,
            },
          },
          {
            label: "Actions",
            collapsed: false,
            autogenerate: {
              directory: "generated/actions",
              collapsed: true,
            },
          },
          {
            label: "Types",
            collapsed: false,
            autogenerate: {
              directory: "generated/types",
              collapsed: true,
            },
          },
        ],
      });
    },
  },
} satisfies StarlightPlugin;
