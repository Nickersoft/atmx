import { exit } from "node:process";

import type { ResolvedConfig } from "@/config/types.js";
import type { Snippet } from "@atmx-org/common";
import { confirm } from "@inquirer/prompts";

import { pathExists } from "@atmx-org/registry/helpers/filesystem/path-exists.js";
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
      message: `It looks like you already have "${snippet.id}" added to your project. Do you wish to overwrite it and its dependencies?`,
    });

    if (!shouldOverwrite) {
      exit();
    }
  }

  return { outputPath, force: false };
}
