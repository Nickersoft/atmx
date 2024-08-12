/**
 * Select performs a filter and a mapper inside of a reduce, only
 * iterating the list one time. If condition is omitted, will
 * select all mapped values that are non-nullish.
 *
 * @example
 * select(
 *   [1, 2, 3, 4],
 *   x => x * x,
 *   x => x > 2
 * ) // => [9, 16]
 */
export function select<T, U>(
  array: readonly T[],
  mapper: (item: T, index: number) => U,
  condition: ((item: T, index: number) => boolean) | null | undefined,
): U[];

export function select<T, U>(
  array: readonly T[],
  mapper: (item: T, index: number) => U | null | undefined,
): U[];

export function select<T, U>(
  array: readonly T[],
  mapper: (item: T, index: number) => U,
  condition?: ((item: T, index: number) => boolean) | null,
): U[] {
  if (!array) {
    return [];
  }
  let mapped: U;

  return array.reduce((acc, item, index) => {
    if (condition) {
      condition(item, index) && acc.push(mapper(item, index));
    } else if ((mapped = mapper(item, index)) != null) {
      acc.push(mapped);
    }

    return acc;
  }, [] as U[]);
}
