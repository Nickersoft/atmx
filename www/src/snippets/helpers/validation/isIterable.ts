/**
 * Check if a value is iterable.
 *
 * @param value - The value to check.
 * @returns `true` if the value is iterable, `false` otherwise.
 * @example
 * isIterable([1, 2, 3]) // => true
 * isIterable('hello') // => false
 */
export function isIterable(value: unknown): value is Iterable<unknown> {
  return (
    typeof value === "object" && value !== null && Symbol.iterator in value
  );
}
