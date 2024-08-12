/**
 * Checks if the given value is primitive.
 *
 * Primitive types include:
 * - number
 * - string
 * - boolean
 * - symbol
 * - bigint
 * - undefined
 * - null
 *
 * @example
 * isPrimitive(0) // => true
 * isPrimitive(null) // => true
 * isPrimitive(undefined) // => true
 * isPrimitive('0') // => false
 */
export function isPrimitive(value: any): boolean {
  return (
    value === undefined ||
    value === null ||
    (typeof value !== "object" && typeof value !== "function")
  );
}
