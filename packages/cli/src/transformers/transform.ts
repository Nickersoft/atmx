import type { ResolvedConfig, Transformer } from "@/types.js";
import { createSourceFile } from "@atmx-org/common";

import { transformImports } from "./transform-imports.js";

const transformers: Transformer[] = [transformImports];

export async function transform(
  name: string,
  code: string,
  config: ResolvedConfig,
) {
  const sourceFile = await createSourceFile(name, code);

  for (const transformer of transformers) {
    transformer(sourceFile, config);
  }

  return sourceFile.getFullText();
}
