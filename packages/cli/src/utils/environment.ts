import { readFile } from "node:fs/promises";
import { resolve, join } from "node:path";

import { detect } from "detect-package-manager";

import { pathExists } from "@atmx-org/registry/helpers/filesystem/path-exists.ts";

/**
 * Taken from
 * https://github.com/npm/package-json/blob/main/lib/read-package.js
 */
async function read(filename: string) {
  try {
    const data = await readFile(filename, "utf8");
    return data;
  } catch (err) {
    (err as Error).message = `Could not read package.json: ${err}`;
    throw err;
  }
}

function parse(data: string) {
  try {
    const content = JSON.parse(data);
    return content;
  } catch (err) {
    (err as Error).message = `Invalid package.json: ${err}`;
    throw err;
  }
}

interface PackageJSON {
  type?: string;
  dependencies?: Record<string, string>;
  devDependencies?: Record<string, string>;
}

async function readPackageJSON(cwd: string): Promise<PackageJSON> {
  const data = await read(join(cwd, "package.json"));
  return parse(data) as PackageJSON;
}

async function isESM(cwd: string) {
  const pkgJson = await readPackageJSON(cwd);
  return pkgJson.type === "module";
}

function isTypescriptProject(cwd: string = process.cwd()): Promise<boolean> {
  return pathExists(resolve(cwd, "tsconfig.json"));
}

async function detectPackageManager(
  targetDir: string,
): Promise<ReturnType<typeof detect>> {
  return detect({ cwd: targetDir, includeGlobalBun: true });
}

export {
  detectPackageManager,
  read,
  parse,
  readPackageJSON,
  isESM,
  isTypescriptProject,
};
