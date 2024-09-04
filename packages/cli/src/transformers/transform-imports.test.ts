import { it } from "vitest";

import { createSourceFile } from "@atmx-org/common";
import { parseConfig } from "@/config/parse-config.js";

import { transformImports } from "./transform-imports.js";

it("should trim JS extensions for non-ESM modules", async () => {
  const source = await createSourceFile(
    "test",
    `import { foo } from "@/foo.js";`,
  );

  const baseConfig = await parseConfig({
    aliases: {
      helpers: "@/helpers",
      hooks: "@/hooks",
    },
  });

  transformImports(source, {
    ...baseConfig,
    isESM: false,
  });
});
