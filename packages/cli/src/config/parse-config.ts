import { parse } from "valibot";

import type { Config, ResolvedConfig } from "@/types.js";
import { isESM } from "@/utils/is-esm.js";
import { resolveAlias } from "@/utils/resolve-alias.js";

import { configSchema, resolvedConfigSchema } from "./schema.js";

export async function resolveConfig(
  cwd: string,
  config: Config,
): Promise<ResolvedConfig> {
  return parse(resolvedConfigSchema, {
    ...config,
    isESM: await isESM(cwd),
    resolvedAliases: {
      helpers: resolveAlias("helper", config),
      hooks: resolveAlias("hook", config),
    },
  });
}

export async function getConfig(
  cwd: string,
  config: Config,
): Promise<ResolvedConfig> {
  return parse(configSchema, {
    ...config,
    isESM: await isESM(cwd),
    resolvedAliases: {
      helpers: resolveAlias("helper", configFile.config),
      hooks: resolveAlias("hook", configFile.config),
    },
  });
}
