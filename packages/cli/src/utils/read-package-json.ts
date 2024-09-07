/**
 * Taken from
 * https://github.com/npm/package-json/blob/main/lib/read-package.js
 */

import { readFile } from "node:fs/promises";
import { join } from "node:path";

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

export { read, parse, readPackageJSON };
