import { ExpandedSnippet, Snippet } from "@/types.js";

import { extractTSDoc } from "./extract-tsdoc.js";

export async function expandSnippet(snippet: Snippet) {
  const tsdoc = extractTSDoc(snippet);
  return { ...snippet, ...tsdoc } satisfies ExpandedSnippet;
}
