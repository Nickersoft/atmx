import { readPackageJSON } from "./read-package-json.js";

export async function isESM(cwd: string) {
  const pkgJson = await readPackageJSON(cwd);
  return pkgJson.type === "module";
}
