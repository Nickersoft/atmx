import { writeFileSync } from "node:fs";
import { readdir, rm, unlink } from "node:fs/promises";
import { basename, extname, join } from "node:path";

import { alphabetical } from "@atmx-org/registry/helpers/arrays/alphabetical.ts";

export async function generateIndexFile(registryPath: string) {
  const files: string[] = await readdir(registryPath);

  const validFiles = files.filter(
    (file) => [".js", ".ts"].includes(extname(file)) && !file.includes("index"),
  );

  const exports = validFiles.map((file) => {
    const functionName = basename(file, extname(file));
    return `export { ${functionName} } from './${functionName}';`;
  });

  // Sort the exports alphabetically and join them into a string
  const indexContent =
    alphabetical(
      exports,
      (v) => v.match(/\{ (\w+) \}/)?.[1].toLowerCase() ?? v,
    ).join("\n") + "\n";

  writeFileSync(join(registryPath, "index.ts"), indexContent);
}

export async function deleteIndexFile(registryPath: string) {
  try {
    const indexPath = join(registryPath, "index.ts");
    await rm(indexPath);
  } catch (error) {
    console.error(error);
  }
}
