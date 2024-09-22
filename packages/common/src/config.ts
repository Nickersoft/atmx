import * as v from "valibot";

import { getRegistryName } from "@/utils/get-registry.ts";
import { SNIPPET_TYPES } from "@/consts.ts";

export const configSchema = v.object({
  index: v.optional(v.boolean(), false),
  cwd: v.optional(v.string(), "."),
  ts: v.optional(v.boolean(), false),
  casing: v.optional(
    v.enum({
      kebab: "kebab",
      camel: "camel",
    }),
    "kebab",
  ),
  aliases: v.pipe(
    v.object({
      actions: v.string(),
      types: v.string(),
      helpers: v.string(),
      hooks: v.string(),
    }),
    v.check(
      (aliases) =>
        SNIPPET_TYPES.every((type) => getRegistryName(type) in aliases),
      "Aliases must include all snippet types",
    ),
  ),
});

export type Config = v.InferInput<typeof configSchema>;
