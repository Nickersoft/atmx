import { writeFile } from "node:fs/promises";

import { type Snippet } from "@atmx-org/common";

import type { ResolvedConfig } from "@/config/types.ts";
import { transform } from "@/transformers/transform.ts";
import { deleteIndexFile, generateIndexFile } from "./index-file.ts";
import { dirname } from "node:path";

interface InstallSnippetOptions {
  snippet: Snippet;
  config: ResolvedConfig;
  outputPath: string;
}

export async function installSnippet({
  snippet,
  config,
  outputPath,
}: InstallSnippetOptions) {
  const url = new URL(snippet.urls[config.ts ? "ts" : "js"]);
  const rawCode = await fetch(url).then((res) => res.text());
  const code = await transform(snippet.name, rawCode, config);

  await writeFile(outputPath, code);

  const indexDir = dirname(outputPath);

  if (config.index) {
    generateIndexFile(indexDir);
  } else {
    deleteIndexFile(indexDir);
  }
}
