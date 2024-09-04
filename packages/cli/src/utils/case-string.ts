import type { ResolvedConfig } from "@/config/types.js";

import { camel } from "@atmx-org/registry/helpers/strings/camel.js";
import { dash } from "@atmx-org/registry/helpers/strings/dash.js";

export function caseString(str: string, config: ResolvedConfig) {
  return config.casing === "camel" ? camel(str) : dash(str);
}
