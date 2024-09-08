/**
 * A value that can be reliably compared with JavaScript comparison
 * operators (e.g. `>`, `>=`, etc).
 */
export type Comparable =
  | number
  | string
  | bigint
  | { valueOf: () => number | string | bigint }
  | { [Symbol.toPrimitive](hint: "number"): number }
  | { [Symbol.toPrimitive](hint: "string"): string };
