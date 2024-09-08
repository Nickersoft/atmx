import { createMatchPath, loadConfig } from "tsconfig-paths";

import { getRegistryName, type SnippetType } from "@atmx-org/common";

type AliasMap = Record<string, string>;

interface ResolveAliasProps {
  type: SnippetType;
  aliasMap: AliasMap;
  isTypeScript: boolean;
}

export function resolveAlias({
  type,
  aliasMap,
  isTypeScript,
}: ResolveAliasProps): string {
  const aliasKey = getRegistryName(type);
  const alias = aliasMap?.[aliasKey];
  const tsConfig = loadConfig();

  if (tsConfig.resultType === "failed") {
    throw new Error(
      `Failed to load ${isTypeScript ? "tsconfig" : "jsconfig"}.json. ${
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
