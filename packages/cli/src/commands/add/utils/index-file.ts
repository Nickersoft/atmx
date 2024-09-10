import { writeFileSync } from "node:fs";
import { readdir, rm, unlink } from "node:fs/promises";
import { basename, extname, join } from "node:path";

import { alphabetical } from "@atmx-org/registry/helpers/arrays/alphabetical.ts";

function convertToFunctionName(fileName: string, isTypesRegistry: boolean): string {
  const words = fileName.split('-');
  
  return words.map((word, index) => {
      if (index === 0 && !isTypesRegistry) {
          return word;
      }
      return word.charAt(0).toUpperCase() + word.slice(1);
  }).join('');
}

export async function generateIndexFile(registryPath: string, isESM: boolean, isTs: boolean) {
  const files: string[] = await readdir(registryPath);

  const fileExtension = isTs ? '.ts' : '.js';
  const validFiles = files.filter(
    (file) => extname(file) === fileExtension && !file.includes("index"),
  );

  const exportExtension = isESM ? '.js' : '';
  const exports = validFiles.map((file) => {
    const fileName = basename(file, extname(file));
    const functionName = convertToFunctionName(fileName, registryPath.includes('types'));
    return `export { ${functionName} } from './${fileName}${exportExtension}';`;
  });

  // Sort the exports alphabetically and join them into a string
  const indexContent =
    alphabetical(
      exports,
      (v) => v.match(/\{ (\w+) \}/)?.[1].toLowerCase() ?? v,
    ).join("\n") + "\n";

  writeFileSync(join(registryPath, "index" + fileExtension), indexContent);
}

export async function deleteIndexFile(registryPath: string, isTs: boolean) {
  try {
    const indexPath = join(registryPath, "index" + isTs ? '.ts' : '.js');
    await rm(indexPath);
  } catch (error) {
    console.error(error);
  }
}
