import { random as randomFn } from "@/snippets/helpers/random/random";

/**
 * Clone an array and shuffle its items randomly.
 *
 * @example
 * const numbers = [1, 2, 3, 4, 5]
 * const shuffled = shuffle(numbers) // => [2, 1, 4, 5, 3]
 * shuffled !== numbers // => true
 */
export function shuffle<T>(
  array: readonly T[],
  random: (min: number, max: number) => number = randomFn,
): T[] {
  const newArray = array.slice();
  for (let idx = 0, randomIdx: number, item: T; idx < array.length; idx++) {
    randomIdx = random(0, array.length - 1);
    item = newArray[randomIdx];
    newArray[randomIdx] = newArray[idx];
    newArray[idx] = item;
  }
  return newArray;
}