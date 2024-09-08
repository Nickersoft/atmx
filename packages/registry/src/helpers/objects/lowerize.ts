import { mapKeys } from "@/helpers/objects/map-keys.ts";

export type LowercaseKeys<T extends Record<string, any>> = {
  [P in keyof T & string as Lowercase<P>]: T[P];
};

/**
 * Convert all keys in an object to lower case.
 *
 * @example
 * const a = { A: 1, B: 2, C: 3 }
 * lowerize(a) // => { a: 1, b: 2, c: 3 }
 */
export function lowerize<T extends Record<string, any>>(
  obj: T,
): LowercaseKeys<T> {
  return mapKeys(obj, (k) => k.toLowerCase()) as LowercaseKeys<T>;
}
