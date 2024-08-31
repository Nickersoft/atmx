import { writeFile, mkdir } from "node:fs/promises";
import { resolve, join } from "node:path";
import { fileURLToPath } from "node:url";

import { format } from "prettier";

import { Eta } from "eta";

import {
  expandSnippet,
  getRegistryName,
  SNIPPET_TYPES,
  type Snippet,
  type SnippetType,
} from "@atmx-org/common";

import { getSnippets } from "../../src/lib/get-snippets";

import type { TemplateData } from "./types";

const eta = new Eta({
  views: fileURLToPath(new URL("../../templates", import.meta.url)),
});

export function filterSnippets(
  snippets: Record<SnippetType, Snippet[]>,
): [string, Snippet[]][] {
  return Object.entries(snippets).filter((entry) =>
    SNIPPET_TYPES.includes(entry[0] as SnippetType),
  );
}

async function processSnippet(snippet: Snippet): Promise<void> {
  const code = snippet.content;
  const expanded = await expandSnippet(snippet);
  const registry = getRegistryName(snippet.type);

  const result = eta.render<TemplateData>("mdx", {
    name: snippet.name,
    type: snippet.type,
    description: expanded.description,
    example: expanded.examples[0] ?? "",
    code: await format(code, { parser: "typescript" }),
    slug: expanded.urls.docs.slice(1),
  });

  const outputDir = resolve(
    fileURLToPath(new URL("../../src/content/docs/generated", import.meta.url)),
    registry,
    expanded.category,
  );

  await mkdir(outputDir, { recursive: true });

  const outputPath = join(outputDir, `${snippet.name}.mdx`);

  await writeFile(outputPath, result, "utf-8");

  console.log(`MDX file "${outputPath}" has been created successfully.`);
}

export async function generateSnippetMDX(): Promise<void> {
  const snippets: [string, Snippet[]][] = filterSnippets(await getSnippets());

  await Promise.all(
    snippets.flatMap(async (entry) => entry[1].map(processSnippet)),
  );

  console.log("All snippets processed and converted to MDX.");
}
