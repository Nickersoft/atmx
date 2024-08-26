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
            collapsed: true,
            autogenerate: { directory: "generated/helpers", collapsed: true },
          },
        ],
      });
    },
  },
} satisfies StarlightPlugin;
