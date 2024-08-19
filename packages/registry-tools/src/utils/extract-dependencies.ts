import type { Dependencies } from "@/types.js";

import { createSourceFile } from "./ast.js";
import { SourceFile } from "ts-morph";

export async function extractDependencies(
  sourceFile: SourceFile,
): Promise<Dependencies> {
  return sourceFile
    .getImportDeclarations()
    .map((node) => node.getModuleSpecifierValue())
    .reduce(
      (acc, source) => {
        const match = source.match(/@\/snippets\/(.+)\/.+\/(.+)/);

        if (source === "@/snippets/helpers/types") {
          acc.local.push("helpers/types");
          return acc;
        } else if (match) {
          acc.local.push(`${match[1]}/${match[2]}`);
        } else {
          acc.external.push(source);
        }

        return acc;
      },
      { local: [] as string[], external: [] as string[] },
    );
}
