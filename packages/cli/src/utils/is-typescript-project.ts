import { resolve } from "node:path";

import { pathExists } from "fs-extra";

export function isTypescriptProject(cwd: string = process.cwd()) {
  return pathExists(resolve(cwd, "tsconfig.json"));
}
