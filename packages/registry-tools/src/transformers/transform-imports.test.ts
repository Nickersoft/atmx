import { expect, test } from "vitest";

import { transformImports } from "./transform-imports.js";
import { createSourceFile } from "@/utils/ast.js";

const code = `
import groupBy from '@/snippets/helpers/array/groupBy';
`.trim();

test("Transforms imports correctly", async () => {
  const file = await createSourceFile("test", code);

  const result = await transformImports(file, (source) =>
    source.replaceAll(/snippets\/(.+?)\/.+?\/(.+?)/g, "helpers/$2"),
  );

  expect(result.getFullText().trim()).toBe(
    `import groupBy from '@/helpers/groupBy';`.trim(),
  );
});
