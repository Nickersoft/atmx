import { exit } from "node:process";

import type { ResolvedConfig } from "@/config/types.ts";
import type { Snippet } from "@atmx-org/common";
import { confirm } from "@inquirer/prompts";

import { pathExists } from "@/helpers/filesystem/path-exists.ts";
import { getOutputPath as getOutPath } from "@/utils/get-output-path.ts";
import { clearSpinners } from "@/spinners.ts";

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
