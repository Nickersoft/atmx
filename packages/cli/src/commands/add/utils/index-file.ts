import { readdir, rm, unlink, writeFile } from "node:fs/promises";
import { basename, extname, join } from "node:path";
import { camel } from "@/helpers/strings/camel.ts";
import { pascal } from "@/helpers/strings/pascal.ts";

import { alphabetical } from "@atmx-org/registry/helpers/arrays/alphabetical.ts";
import { pathExists } from "@atmx-org/registry/helpers/filesystem/path-exists.js";

export async function generateIndexFile(
  registryPath: string,
  isESM: boolean,
  isTs: boolean,
) {
  const files: string[] = await readdir(registryPath);

  const fileExtension = isTs ? ".ts" : ".js";

  const validFiles = files.filter(
    (file) => extname(file) === fileExtension && !file.includes("index"),
  );

  const exportExtension = isESM ? ".js" : "";
  const typePrefix = registryPath.includes("types") ? "type " : "";
  const exports = validFiles.map((file) => {
    const fileName = basename(file, extname(file));
    const functionName = registryPath.includes("types")
      ? pascal(fileName)
      : camel(fileName);
    return `export { ${typePrefix}${functionName} } from './${fileName}${exportExtension}';`;
  });

  // Sort the exports alphabetically and join them into a string
  const indexContent =
    alphabetical(
      exports,
      (v) => v.match(/\{ (\w+) \}/)?.[1].toLowerCase() ?? v,
    ).join("\n") + "\n";

  await writeFile(join(registryPath, "index" + fileExtension), indexContent);
}

export async function deleteIndexFile(registryPath: string, isTs: boolean) {
  try {
    const ext = isTs ? "ts" : "js";
    const indexPath = join(registryPath, `index.${ext}`);

    if (await pathExists(indexPath)) {
      await rm(indexPath, { recursive: true });
    }
  } catch (error) {
    console.error(error);
  }
}
