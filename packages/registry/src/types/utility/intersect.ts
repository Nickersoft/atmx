/**
 * Converts a union into an intersection
 *
 * @example
 * Intersect<{ a: 1 } | { b: 2 }> // ^? { a: 1 } & { b: 2 }
 */
export type Intersect<U> = (U extends any ? (k: U) => void : never) extends (
  k: infer I,
) => void
  ? I
  : never;
