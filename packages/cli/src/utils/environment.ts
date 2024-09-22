import fg from "fast-glob";

import { readFile } from "node:fs/promises";
import { join } from "node:path";

import { detect } from "detect-package-manager";
import { lilconfig } from "lilconfig";

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
  return lilconfig("tsconfig", {
    searchPlaces: ["tsconfig.json"],
    stopDir: cwd,
    loaders: {
      ".json": (_, content) => content,
    },
  })
    .search(cwd)
    .then((result) => !!result);
}

async function isSvelteProject(cwd: string = process.cwd()): Promise<boolean> {
  const hasSvelteConfig = await lilconfig("svelte", {
    searchPlaces: ["svelte.config.js"],
    stopDir: cwd,
  })
    .search(cwd)
    .then((result) => !!result);

  const hasSvelteFiles = await fg.glob("**/*.svelte", { cwd });

  return hasSvelteConfig || hasSvelteFiles.length > 0;
}

async function isReactProject(cwd: string = process.cwd()): Promise<boolean> {
  const hasNextConfig = await lilconfig("next", {
    stopDir: cwd,
    searchPlaces: ["next.config.js", "next.config.ts"],
    loaders: {
      ".ts": (_, content) => content,
    },
  })
    .search(cwd)
    .then((result) => !!result);
  const hasReactFiles = await fg.glob("**/*.{jsx,tsx}", { cwd });
  return hasNextConfig || hasReactFiles.length > 0;
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
  isSvelteProject,
  isReactProject,
};
