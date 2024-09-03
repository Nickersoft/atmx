import { expect, test } from "vitest";

import { extractTSDoc } from "./extract-tsdoc.js";
import type { SnippetType } from "@/types.js";

const code = `
/**
 * Given an array of arrays, returns a single dimensional array with
 * all items in it.
 *Ho
 * @example
 * flat([[1, 2], [[3], 4], [5]]) // [1, 2, [3], 4, 5]
 */
export function flat<T>(lists: readonly T[][]): T[] {}
`.trim();

test("extracts docs correctly", async () => {
  const snippet = {
    name: "flat",
    content: code,
    type: "helper" as SnippetType,
    category: "array",
    urls: {
      ts: "/registry/helpers/flat.ts",
      js: "/registry/helpers/flat.js",
      docs: "/helpers/flat",
      metadata: "/registry/helpers/flat.json",
    },
    dependencies: {
      local: [],
      external: [],
    },
  };

  const result = await extractTSDoc(snippet);

  expect(result).toStrictEqual({
    description:
      "Given an array of arrays, returns a single dimensional array with\nall items in it.",
    parameters: [],
    examples: ["flat([[1, 2], [[3], 4], [5]]) // [1, 2, [3], 4, 5]"],
  });
});
