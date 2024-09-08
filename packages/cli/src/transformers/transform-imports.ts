import { basename, dirname, extname } from "node:path";

import {
  getRegistryName,
  SNIPPET_TYPES,
  transformImports as rewriteImports,
  type SnippetType,
  type SourceFile,
} from "@atmx-org/common";

import type { Transformer } from "@/types.ts";
import type { ResolvedConfig } from "@/config/types.ts";
import { caseString } from "@/utils/case-string.ts";

export const transformImports: Transformer = (
  sourceFile: SourceFile,
  config: ResolvedConfig,
) =>
  rewriteImports(sourceFile, (moduleSpecifier) => {
    let specifier = moduleSpecifier.replace(/.ts$/, ".js");

    if (moduleSpecifier.startsWith("node:")) {
      return moduleSpecifier;
    }

    if (!moduleSpecifier.startsWith("@/")) {
      return moduleSpecifier;
    }

    const ext = extname(specifier);
    const base = basename(specifier, ext);

    // Remove the .js extension from non-ESM imports
    if (!config.isESM && ext === ".js") {
      specifier = specifier.slice(0, -3);
    }

    for (const type of SNIPPET_TYPES) {
      const prefix = `@/${getRegistryName(type as SnippetType)}`;

      // Replace local imports with the user's chosen alias
      if (specifier.startsWith(prefix)) {
        const aliasKey = getRegistryName(
          type,
        ) as keyof ResolvedConfig["aliases"];

        specifier = specifier.replace(prefix, config.aliases[aliasKey]);
      }
    }

    const dir = dirname(specifier);
    const fileName = caseString(base, config);

    return `${dir}/${fileName}${ext}`;
  });
