import { resolve } from "node:path";

import { pathExists } from "fs-extra";

export function isTypescriptProject(
  cwd: string = process.cwd(),
): Promise<boolean> {
  return pathExists(resolve(cwd, "tsconfig.json"));
}
