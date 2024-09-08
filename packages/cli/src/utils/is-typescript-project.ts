import { resolve } from "node:path";

import { pathExists } from "@atmx-org/registry/helpers/filesystem/path-exists.ts";

export function isTypescriptProject(
  cwd: string = process.cwd(),
): Promise<boolean> {
  return pathExists(resolve(cwd, "tsconfig.json"));
}
