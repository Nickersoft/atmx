import { parse } from "node:path";

/**
 * Determines whether a path contains invalid characters.
 *
 * @param path - The path to check.
 * @returns
 */
export function isPathValid(path: string): boolean {
  if (process.platform === "win32") {
    const pathHasInvalidWinCharacters = /[<>:"|?*]/.test(
      path.replace(parse(path).root, ""),
    );

    if (pathHasInvalidWinCharacters) {
      const error = new Error(`Path contains invalid characters: ${path}`);
      (error as any).code = "EINVAL";
      return false;
    }
  }

  return true;
}
