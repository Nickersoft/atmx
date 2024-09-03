import {
  getRegistryName,
  SNIPPET_TYPES,
  transformImports as rewriteImports,
  type SnippetType,
  type SourceFile,
} from "@atmx-org/common";

import type { Output, ResolvedConfig, Transformer } from "@/types.js";

export const transformImports: Transformer = (
  sourceFile: SourceFile,
  config: Output<ResolvedConfig>,
) =>
  rewriteImports(sourceFile, (moduleSpecifier) => {
    let specifier = moduleSpecifier;

    if (config.isESM && moduleSpecifier.endsWith(".js")) {
      specifier = specifier.slice(0, -3);
    }

    for (const type of SNIPPET_TYPES) {
      const prefix = `@/${getRegistryName(type as SnippetType)}`;

      if (specifier.startsWith(prefix)) {
        return specifier.replace(
          prefix,
          config.aliases[
            getRegistryName(type) as keyof Output<ResolvedConfig>["aliases"]
          ],
        );
      }
    }

    return specifier;
  });
