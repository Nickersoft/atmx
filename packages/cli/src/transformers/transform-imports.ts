import {
  getRegistryName,
  SNIPPET_TYPES,
  transformImports as rewriteImports,
  type SnippetType,
  type SourceFile,
} from "@atmx-org/common";

import type { ResolvedConfig, Transformer } from "@/types.js";

export const transformImports: Transformer = (
  sourceFile: SourceFile,
  config: ResolvedConfig,
) =>
  rewriteImports(sourceFile, (moduleSpecifier) => {
    for (const type of SNIPPET_TYPES) {
      const prefix = `@/${getRegistryName(type as SnippetType)}`;

      if (moduleSpecifier.startsWith(prefix)) {
        return moduleSpecifier.replace(
          prefix,
          config.aliases[
            getRegistryName(type) as keyof ResolvedConfig["aliases"]
          ],
        );
      }
    }

    return moduleSpecifier;
  });
