import { writeFile, mkdir, rm } from "node:fs/promises";
import { resolve, join } from "node:path";
import { fileURLToPath } from "node:url";
import { existsSync } from "node:fs";

import { format } from "prettier";

import { Eta } from "eta";

import { getDocsForSnippet } from "@atmx-org/registry-tools";

import {
  getRegistryName,
  SNIPPET_TYPES,
  type Snippet,
  type SnippetType,
} from "@atmx-org/common";

import type { TemplateData } from "./types";

import { createRegistry } from "../../src/lib/create-registry";

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
  const docs = await getDocsForSnippet(snippet);
  const registry = getRegistryName(snippet.type);

  const result = eta.render<TemplateData>("mdx", {
    name: snippet.name,
    id: snippet.id,
    type: snippet.type,
    description: docs.description,
    example: docs.examples[0] ?? "",
    code: await format(code, { parser: "typescript" }),
    slug: snippet.urls.docs.slice(1),
  });

  const generatedDir = fileURLToPath(
    new URL("../../src/content/docs/generated", import.meta.url),
  );

  if (existsSync(generatedDir)) {
    await rm(generatedDir, { recursive: true });
  }

  const outputDir = resolve(generatedDir, registry, snippet.category);

  await mkdir(outputDir, { recursive: true });

  const outputPath = join(outputDir, `${snippet.name}.mdx`);

  await writeFile(outputPath, result, "utf-8");

  console.log(`MDX file "${outputPath}" has been created successfully.`);
}

export async function generateSnippetMDX(): Promise<void> {
  const snippets: [string, Snippet[]][] = filterSnippets(
    await createRegistry(),
  );

  await Promise.all(
    snippets.flatMap(async (entry) => entry[1].map(processSnippet)),
  );

  console.log("All snippets processed and converted to MDX.");
}
