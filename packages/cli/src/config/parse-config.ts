import { parseAsync } from "valibot";

import { configSchema } from "./schema.js";
import type { Config, ResolvedConfig } from "./types.js";

export function parseConfig(config: Config): Promise<ResolvedConfig> {
  return parseAsync(configSchema, config);
}
