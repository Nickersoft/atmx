/**
 * A comparator function. It can be passed to the `sort` method of
 * arrays to sort the elements.
 *
 * Return a negative number to sort the “left” value before the “right”
 * value, a positive number to sort the “right” value before the “left”
 * value, and 0 to keep the order of the values.
 *
 * @example
 * Comparator<string> // (a: string, b: string) => number
 */
export type Comparator<T> = (left: T, right: T) => number;
