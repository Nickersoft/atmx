import * as v from "valibot";

import { getRegistryName } from "@/utils/get-registry.ts";
import { REGISTRY_HOST, SNIPPET_TYPES } from "@/consts.ts";

export const configSchema = v.pipe(
  v.object({
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
  }),
  v.transform((config) => ({
    $schema: `${REGISTRY_HOST}/schema.json`,
    ...config,
  })),
);

export type Config = v.InferInput<typeof configSchema>;
