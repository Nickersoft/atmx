import * as v from "valibot";

import { isESM } from "@/utils/is-esm.js";
import { resolveAlias } from "@/utils/resolve-alias.js";
import {
  getRegistryName,
  SNIPPET_TYPES,
  type RegistryName,
} from "@atmx-org/common";

export const stringCasing = v.enum({
  kebab: "kebab",
  camel: "camel",
});

export const configSchema = v.pipeAsync(
  v.object({
    cwd: v.optional(v.string(), "."),
    ts: v.optional(v.boolean(), false),
    casing: v.optional(stringCasing, "kebab"),
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
  v.transformAsync(async (config) => ({
    ...config,
    isESM: await isESM(config.cwd),
    resolvedAliases: Object.fromEntries(
      await Promise.all(
        SNIPPET_TYPES.map(async (type) => [
          getRegistryName(type),
          await resolveAlias({
            type,
            aliasMap: config.aliases,
            isTypeScript: config.ts,
          }),
        ]),
      ),
    ) as Record<RegistryName, string>,
  })),
);
