import type { ResolvedConfig } from "@/config/types.ts";

import { camel } from "@atmx-org/registry/helpers/strings/camel.ts";
import { dash } from "@atmx-org/registry/helpers/strings/dash.ts";

export function caseString(str: string, config: ResolvedConfig) {
  return config.casing === "camel" ? camel(str) : dash(str);
}
