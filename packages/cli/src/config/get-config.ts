import { parse } from "valibot";
import { lilconfig } from "lilconfig";

import { CLI_NAME } from "@atmx-org/common";

import type { ResolvedConfig } from "@/types.js";
import { CONFIG_FILENAME } from "@/consts.js";
import { resolveAlias } from "@/utils/resolve-alias.js";

import { resolvedConfigSchema } from "./schema.js";

const searcher = lilconfig("utils", { searchPlaces: ["utils.json"] });

/**
 * Reads the configuration from the file system
 * @returns The configuration object
 */
export async function getConfig(): Promise<ResolvedConfig> {
  const configFile = await searcher.search();

  if (!configFile) {
    throw new Error(
      `Could not find a ${CONFIG_FILENAME} file! Did you forget to run \`${CLI_NAME} init\`?`,
    );
  }

  return parse(resolvedConfigSchema, {
    ...configFile.config,
    resolvedAliases: {
      helpers: resolveAlias("helper", configFile.config),
      hooks: resolveAlias("hook", configFile.config),
    },
  });
}
