/**
 * Checks if the given value is a string.
 *
 * @example
 * isString('abc') // => true
 * isString(123) // => false
 */
export function isString(value: unknown): value is string {
  return typeof value === "string";
}
