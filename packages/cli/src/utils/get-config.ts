import * as z from "zod";

import { lilconfig } from "lilconfig";

import type { ResolvedConfig } from "@/types.js";

import { CLI_NAME, CONFIG_FILENAME } from "../consts.js";
import { resolveAlias } from "./resolve-alias.js";

const searcher = lilconfig("utils", { searchPlaces: ["utils.json"] });

export const configSchema = z
  .object({
    ts: z.boolean(),
    aliases: z.object({
      helpers: z.string(),
      hooks: z.string(),
    }),
  })
  .strict();

export const resolvedConfigSchema = configSchema.extend({
  resolvedAliases: z.object({
    helpers: z.string(),
    hooks: z.string(),
  }),
});

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

  return resolvedConfigSchema.parse({
    ...configFile.config,
    resolvedAliases: {
      helpers: resolveAlias("helper", configFile.config),
      hooks: resolveAlias("hook", configFile.config),
    },
  });
}
