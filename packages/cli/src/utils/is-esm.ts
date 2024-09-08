import { readPackageJSON } from "./read-package-json.ts";

export async function isESM(cwd: string) {
  const pkgJson = await readPackageJSON(cwd);
  return pkgJson.type === "module";
}
