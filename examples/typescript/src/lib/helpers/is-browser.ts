/**
 * Check if the current environment is a browser.
 *
 * @example
 * ```ts
 * import { isBrowser } from "@/helpers/is-browser";
 *
 * if (isBrowser()) {
 *  console.log("This is a browser environment.");
 * } else {
 *  console.log("This is not a browser environment.");
 * }
 * ```
 *
 * @returns True if the current environment is a browser, false otherwise.
 */
export function isBrowser(): boolean {
  return typeof window !== "undefined";
}
