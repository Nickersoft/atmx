import { parse } from "valibot";

import { configSchema } from "./schema.js";
import type { Config, ResolvedConfig } from "./types.js";

export async function resolveConfig(config: Config): Promise<ResolvedConfig> {
  return parse(configSchema, config);
}
