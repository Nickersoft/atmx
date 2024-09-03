import { join } from "node:path";

import { readPackage } from "./read-package-json.js";

export async function isESM(cwd: string) {
  const pkgJson = await readPackage(join(cwd, "package.json"));
  return pkgJson.type === "module";
}
