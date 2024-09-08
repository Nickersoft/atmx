import { expect, test } from "bun:test";

import { transformImports } from "./transform-imports.ts";
import { createSourceFile } from "@/utils/ast.ts";

const code = `
import groupBy from '@/helpers/arrays/groupBy';
`.trim();

test("transforms imports correctly", async () => {
  const file = await createSourceFile("test", code);

  const result = await transformImports(file, (source) =>
    source.replaceAll(/\/(.+?)\/.+?\/(.+?)/g, "/helpers/$2"),
  );

  expect(result.getFullText().trim()).toBe(
    `import groupBy from '@/helpers/groupBy';`.trim(),
  );
});
