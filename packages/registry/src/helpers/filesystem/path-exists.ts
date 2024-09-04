import { access } from "node:fs/promises";

/**
 * An function that asynchronously checks if a path exists.
 * Requires a modern version of Node, as it uses Node internals.
 *
 * @param path - The path to check.
 * @returns A promise that resolves to a boolean indicating whether the path exists.
 */
export function pathExists(path: string): Promise<boolean> {
  return access(path)
    .then(() => true)
    .catch(() => false);
}
