import { rm } from "node:fs/promises";

/**
 * Recursively deletes a directory using force using promises.
 * Equivalent to rm -rf. Only works server-side.
 *
 * @param path - Path to the directory to delete.
 */
export function rimraf(path: string): Promise<void> {
  return rm(path, { recursive: true, force: true });
}
