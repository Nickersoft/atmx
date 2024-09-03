import { createMatchPath, loadConfig } from "tsconfig-paths";

import { getRegistryName, type SnippetType } from "@atmx-org/common";

import type { Config, Input } from "@/types.js";

export function resolveAlias(type: SnippetType, config: Input<Config>) {
  const aliasKey = getRegistryName(type) as keyof Input<Config>["aliases"];
  const alias = config.aliases?.[aliasKey];
  const tsConfig = loadConfig();

  if (tsConfig.resultType === "failed") {
    throw new Error(
      `Failed to load ${config.ts ? "tsconfig" : "jsconfig"}.json. ${
        tsConfig.message ?? ""
      }`.trim(),
    );
  }

  return (
    createMatchPath(tsConfig.absoluteBaseUrl, tsConfig.paths)(
      alias,
      undefined,
      () => true,
      [".ts", ".tsx"],
    ) ?? alias
  );
}
