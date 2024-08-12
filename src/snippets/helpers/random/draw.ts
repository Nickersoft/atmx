import { random } from "@/snippets/helpers/random/random";

/**
 * “Draw” a random item from an array. The item is not removed from
 * the array. Returns `null` if the array is empty.
 *
 * @example
 * const numbers = [1, 2, 3]
 *
 * draw(numbers) // => 2
 * numbers // => [1, 2, 3]
 */
export function draw<T>(array: readonly T[]): T | null {
  const max = array.length;
  if (max === 0) {
    return null;
  }
  const index = random(0, max - 1);
  return array[index];
}
