import * as v from "valibot";

export const stringCasing = v.enum({
  kebab: "kebab",
  pascal: "pascal",
  camel: "camel",
});

export const configSchema = v.object({
  ts: v.boolean(),
  casing: stringCasing,
  aliases: v.object({
    helpers: v.string(),
    hooks: v.string(),
  }),
});

export const resolvedConfigSchema = v.object({
  ...configSchema.entries,
  resolvedAliases: v.object({
    helpers: v.string(),
    hooks: v.string(),
  }),
});
