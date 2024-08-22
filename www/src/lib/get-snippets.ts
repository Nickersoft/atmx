import { createSnippets, type ImportGlob } from "@atmx-org/common";

export async function getSnippets() {
  const files = await import.meta.glob("../snippets/**/*.ts", { query: "raw" });
  return createSnippets(files as ImportGlob);
}
