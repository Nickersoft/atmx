/**
 * Replace the first occurrence of an item in an array where the
 * `match` function returns true. If no items match, append the new
 * item to the end of the list if append is `true`.
 *
 * @param array - The array to search for the item.
 * @param newItem - The new item to replace the old item with.
 * @param match - The function to determine if an item should be replaced.
 * @param append - If true, append the new item to the end of the list if a match is not found.
 *
 * @example
 * replaceOrAppend([1, 2, 3], 4, (n) => n > 1) // [1, 4, 3]
 * replaceOrAppend([1, 2, 3], 4, (n) => n > 100) // [1, 2, 3, 4]
 */
export function replaceOrAppend<T>(
  array: readonly T[],
  newItem: T,
  match: (a: T, idx: number) => boolean,
  append: boolean = false,
): T[] {
  if (!array && !newItem) {
    return [];
  }

  if (!newItem) {
    return [...array];
  }

  if (!array) {
    return [newItem];
  }

  const out = array.slice();

  for (let index = 0; index < array.length; index++) {
    if (match(array[index], index)) {
      out[index] = newItem;
      return out;
    }
  }

  if (append) {
    out.push(newItem);
  }

  return out;
}
