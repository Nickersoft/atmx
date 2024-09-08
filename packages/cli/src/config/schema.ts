import * as v from "valibot";

import {
  getRegistryName,
  SNIPPET_TYPES,
  configSchema as baseConfigSchema,
  type RegistryName,
} from "@atmx-org/common";

import { isESM } from "@/utils/is-esm.ts";
import { resolveAlias } from "@/utils/resolve-alias.ts";

export const configSchema = v.pipeAsync(
  baseConfigSchema,
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
