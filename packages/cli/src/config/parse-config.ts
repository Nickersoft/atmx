import { parseAsync } from "valibot";

import { configSchema } from "./schema.ts";
import type { Config, ResolvedConfig } from "./types.ts";

export function parseConfig(config: Config): Promise<ResolvedConfig> {
  return parseAsync(configSchema, config);
}
