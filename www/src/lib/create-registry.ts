import { createRegistry as createRegistry_ } from "@atmx-org/registry-tools";

import { mapValues } from "@atmx-org/registry/helpers/objects/map-values.ts";

export async function createRegistry() {
  const files = await import.meta.glob(
    [
      "/node_modules/@atmx-org/registry/src/**/*.ts",
      "!/node_modules/@atmx-org/registry/src/**/*.test.ts",
    ],
    { query: "raw", eager: true },
  );

  return createRegistry_(
    mapValues(files, (f) => (f as { default: string }).default),
  );
}
