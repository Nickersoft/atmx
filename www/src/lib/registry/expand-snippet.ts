import type { ExpandedSnippet, Snippet } from "@atmx-org/common";

import { extractTSDoc } from "./extract-tsdoc.js";

export async function expandSnippet(snippet: Snippet) {
  const tsdoc = await extractTSDoc(snippet);
  return { ...snippet, ...tsdoc } satisfies ExpandedSnippet;
}
