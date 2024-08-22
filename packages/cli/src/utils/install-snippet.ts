import { join } from "node:path";
import { writeFile } from "node:fs/promises";

import { mkdirs, pathExists } from "fs-extra";
import { type Snippet, getRegistryName } from "@atmx-org/common";

import { transform } from "@/transformers/transform.js";
import type { ResolvedConfig } from "@/types.js";

export async function getCode(snippet: Snippet, config: ResolvedConfig) {
  const url = new URL(snippet.urls[config.ts ? "ts" : "js"]);
  const rawCode = await fetch(url).then((res) => res.text());

  return transform(snippet.name, rawCode, config);
}

export async function getOutputPath(snippet: Snippet, config: ResolvedConfig) {
  const alias =
    config.resolvedAliases[
      getRegistryName(snippet.type) as keyof ResolvedConfig["aliases"]
    ];

  const exists = await pathExists(alias);

  if (!exists) {
    await mkdirs(alias);
  }

  const ext = config.ts ? "ts" : "js";

  return join(alias, `${snippet.name}.${ext}`);
}

export async function installSnippet(snippet: Snippet, config: ResolvedConfig) {
  const code = await getCode(snippet, config);
  const outputPath = await getOutputPath(snippet, config);

  return writeFile(outputPath, code);
}
