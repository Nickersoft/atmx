import { join } from "node:path";

import { type Snippet, getRegistryName } from "@atmx-org/common";

import type { ResolvedConfig } from "@/config/types.js";

import { mkdirs } from "@/helpers/filesystem/mkdirs.js";
import { pathExists } from "@/helpers/filesystem/path-exists.js";

import { caseString } from "./case-string.js";

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
  const base = caseString(snippet.id, config);

  return join(alias, `${base}.${ext}`);
}
