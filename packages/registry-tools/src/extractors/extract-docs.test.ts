import { expect, test } from "bun:test";

import type { SnippetType } from "@atmx-org/common";

import { extractDocs } from "./extract-docs.ts";

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
    name: "flat",
    id: "flat",
    content: code,
    type: "helper" as SnippetType,
    category: "array",
    urls: {
      ts: "/registry/helpers/flat.ts",
      js: "/registry/helpers/flat.ts",
      docs: "/helpers/flat",
      metadata: "/registry/helpers/flat.json",
    },
    dependencies: {
      local: [],
      external: [],
    },
  };

  const result = await extractDocs(snippet);

  expect(result).toStrictEqual({
    description:
      "Given an array of arrays, returns a single dimensional array with\nall items in it.",
    parameters: [],
    examples: [
      "```ts\nflat([[1, 2], [[3], 4], [5]]); // [1, 2, [3], 4, 5]\n```",
    ],
  });
});
