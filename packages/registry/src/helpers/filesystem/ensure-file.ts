import { readdir, stat, writeFile } from "node:fs/promises";
import { dirname } from "node:path";

import { mkdirs } from "@/helpers/filesystem/mkdirs.js";

async function ensureDirectory(file: string) {
  const dir = dirname(file);

  let dirStats = null;

  try {
    dirStats = await stat(dir);
  } catch (err) {
    // if the directory doesn't exist, make it
    if ((err as any).code === "ENOENT") {
      await mkdirs(dir);
      return;
    } else {
      throw err;
    }
  }

  if (dirStats.isDirectory()) {
    await writeFile(file, "");
  } else {
    // parent is not a directory
    // This is just to cause an internal ENOTDIR error to be thrown
    await readdir(dir);
  }
}

/**
 * Ensures a file exists at the specified path. If the file does not exist, it will be created.
 *
 * @param file - The path to the file to ensure exists.
 * @returns A promise that resolves when the file exists.
 */
export async function ensureFile(file: string) {
  let stats;

  try {
    stats = await stat(file);
  } catch {}

  // The file exists, so return
  if (stats && stats.isFile()) return;

  await ensureDirectory(file);
  await writeFile(file, "");
}
