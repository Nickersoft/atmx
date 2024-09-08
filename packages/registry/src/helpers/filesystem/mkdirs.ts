import { mkdir } from "node:fs/promises";

import { isPathValid } from "@/helpers/filesystem/is-path-valid.ts";

interface MakeDirsOptions {
  mode?: number;
}

/**
 * Asynchronously creates a directory and any necessary subdirectories.
 * Equivalent to mkdir -p.
 *
 * @param dir – The path to the directory to create.
 * @param opts – Options for creating the directory.
 * @returns The path to the directory that was created.
 */
export async function mkdirs(
  dir: string,
  opts: MakeDirsOptions = {},
): Promise<string | undefined> {
  isPathValid(dir);
  return mkdir(dir, { mode: opts.mode, recursive: true });
}
