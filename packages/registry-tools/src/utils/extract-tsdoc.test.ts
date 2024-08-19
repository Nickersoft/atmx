import { expect, test } from "vitest";

import { extractTSDoc } from "./extract-tsdoc.js";

const code = `
/**
 * Given an array of arrays, returns a single dimensional array with
 * all items in it.
 *
 * @example
 * flat([[1, 2], [[3], 4], [5]]) // [1, 2, [3], 4, 5]
 */
export function flat<T>(lists: readonly T[][]): T[] {}
`.trim();

test("extracts docs correctly", async () => {
  const snippet = {
    name: "test",
    content: code,
    type: "helpers",
    category: "array",
    urls: {
      code: "/registry/helpers/flat.ts",
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
