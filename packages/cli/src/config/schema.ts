import { isESM } from "@/utils/is-esm.js";
import { resolveAlias } from "@/utils/resolve-alias.js";
import * as v from "valibot";

export const stringCasing = v.enum({
  kebab: "kebab",
  camel: "camel",
});

export const configSchema = v.pipe(
  v.object({
    cwd: v.string(),
    ts: v.boolean(),
    casing: v.optional(stringCasing, "kebab"),
    aliases: v.object({
      helpers: v.string(),
      hooks: v.string(),
    }),
  }),
  v.transform(async (config) => ({
    ...config,
    isESM: await isESM(config.cwd),
    resolvedAliases: v.object({
      helpers: await resolveAlias("helper", config),
      hooks: await resolveAlias("helper", config),
    }),
  })),
);

export const resolvedConfigSchema = v.object({
  ...configSchema.entries,
  isESM: v.boolean(),
  resolvedAliases: v.object({
    helpers: v.string(),
    hooks: v.string(),
  }),
});
