import type { ResolvedConfig } from "@/types.js";
import type { Snippet } from "@atmx-org/common";
import { pathExists } from "fs-extra";

import { getOutputPath as getOutPath } from "@/utils/install-snippet.js";

interface GetOutputPathOptions {
  snippet: Snippet;
  overwrite?: boolean;
  config: ResolvedConfig;
}

export async function getOutputPath({
  overwrite,
  snippet,
  config,
}: GetOutputPathOptions) {
  const outputPath = await getOutPath(snippet, config);

  if (!overwrite && (await pathExists(outputPath))) {
    throw new Error(`Code already exists at path: ${outputPath}`);
  }

  return outputPath;
}
