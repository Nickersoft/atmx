/**
 * `Number.isInteger` with better typing.
 *
 * @example
 * isInt(0) // => true
 * isInt(0.1) // => false
 */
export function isInt(value: unknown): value is number {
  return Number.isInteger(value);
}
