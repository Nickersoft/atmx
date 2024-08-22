import {
  getRegistryName,
  SNIPPET_TYPES,
  transformImports as rewriteImports,
  type SnippetType,
} from "@atmx-org/common";
import type { SourceFile } from "ts-morph";

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
