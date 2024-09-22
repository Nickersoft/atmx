import { it } from "vitest";

import { createSourceFile } from "@atmx-org/common";
import { parseConfig } from "@/config/parse-config.ts";

import { transformImports } from "./transform-imports.ts";

it("should trim JS extensions for non-ESM modules", async () => {
  const source = await createSourceFile(
    "test",
    `import { foo } from "@/foo.ts";`,
  );

  const baseConfig = await parseConfig({
    aliases: {
      helpers: "@/helpers",
      hooks: "@/hooks",
      actions: "@/actions",
      types: "@/types",
    },
  });

  transformImports(source, {
    ...baseConfig,
    isESM: false,
  });
});
