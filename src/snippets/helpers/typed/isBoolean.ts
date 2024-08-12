/**
 * Determines if the value is a boolean.
 *
 * @param value - The value to check.
 * @returns `true` if the value is a boolean, `false` otherwise.
 * @example
 * isBoolean(true) // => true
 * isBoolean('hello') // => false
 */
export function isBoolean(value: unknown): value is boolean {
  return typeof value === "boolean";
}
