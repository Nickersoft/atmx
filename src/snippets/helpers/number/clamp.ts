/**
 * The `clamp` function restricts a number to be within a specified
 * range.
 *
 * - It takes three arguments: the number to clamp, the minimum value,
 *   and the maximum value.
 * - If the number is less than the minimum, it returns the minimum.
 * - If the number is greater than the maximum, it returns the
 *   maximum.
 * - Otherwise, it returns the number itself.
 *
 * @example
 * clamp(5, 1, 10) // returns 5
 * clamp(0, 1, 10) // returns 1
 * clamp(15, 1, 10) // returns 10
 */
export function clamp(
  n: number,
  min?: number | null,
  max?: number | null,
): number {
  return Math.min(max ?? n, Math.max(min ?? n, n));
}
