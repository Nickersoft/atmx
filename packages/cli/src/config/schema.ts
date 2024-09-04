import * as v from "valibot";

import { isESM } from "@/utils/is-esm.js";
import { resolveAlias } from "@/utils/resolve-alias.js";

export const stringCasing = v.enum({
  kebab: "kebab",
  camel: "camel",
});

export const configSchema = v.pipeAsync(
  v.object({
    cwd: v.optional(v.string(), "."),
    ts: v.optional(v.boolean(), false),
    casing: v.optional(stringCasing, "kebab"),
    aliases: v.object({
      helpers: v.string(),
      hooks: v.string(),
    }),
  }),
  v.transformAsync(async (config) => ({
    ...config,
    isESM: await isESM(config.cwd),
    resolvedAliases: {
      helpers: await resolveAlias({
        type: "helper",
        aliasMap: config.aliases,
        isTypeScript: config.ts,
      }),
      hooks: await resolveAlias({
        type: "hook",
        aliasMap: config.aliases,
        isTypeScript: config.ts,
      }),
    },
  })),
);
