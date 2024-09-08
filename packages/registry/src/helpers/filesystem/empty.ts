import { join } from "node:path";
import { readdir } from "node:fs/promises";

import { rimraf } from "@/helpers/filesystem/rimraf.ts";
import { mkdirs } from "@/helpers/filesystem/mkdirs.ts";

/**
 * Deletes all the files in a given directory asynchronously while preserving the original directory.
 * If the directory does not exist, it will be created.
 *
 * @param dir - The directory to empty.
 * @returns A boolean denoting whether a directory had to be created.
 */
export async function empty(dir: string) {
  let items: string[];

  try {
    items = await readdir(dir);
  } catch {
    return mkdirs(dir);
  }

  return Promise.all(items.map((item) => rimraf(join(dir, item))));
}
