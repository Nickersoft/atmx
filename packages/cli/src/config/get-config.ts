import { lilconfig } from "lilconfig";

import { CLI_NAME } from "@atmx-org/common";

import type { Config, ResolvedConfig } from "@/types.js";

import { resolveConfig } from "./parse-config.js";
import { CONFIG_FILE_NAME } from "./consts.js";

const searcher = lilconfig("utils", { searchPlaces: [CONFIG_FILE_NAME] });

/**
 * Reads the configuration from the file system
 * @returns The configuration object
 */
export async function getConfig(cwd: string): Promise<ResolvedConfig> {
  const configFile = await searcher.search();

  if (!configFile) {
    throw new Error(
      `Could not find a ${CONFIG_FILE_NAME} file! Did you forget to run \`${CLI_NAME} init\`?`,
    );
  }

  return resolveConfig(cwd, configFile.config as Config);
}
