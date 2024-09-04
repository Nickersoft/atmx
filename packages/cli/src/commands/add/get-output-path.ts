import { exit } from "node:process";

import type { ResolvedConfig } from "@/config/types.js";
import type { Snippet } from "@atmx-org/common";
import { pathExists } from "fs-extra";
import { confirm } from "@inquirer/prompts";

import { getOutputPath as getOutPath } from "@/utils/get-output-path.js";
import { clearSpinners } from "@/spinners.js";

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
    clearSpinners();

    const shouldOverwrite = await confirm({
      message: `Code already exists at path: ${outputPath}. Do you wish to overwrite it and its dependencies?`,
    });

    if (!shouldOverwrite) {
      exit();
    }
  }

  return { outputPath, force: false };
}
