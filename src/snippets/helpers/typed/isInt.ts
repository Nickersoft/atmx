/**
 * Literally just `Number.isInteger` with a better type.
 *
 * @example
 * isInt(0) // => true
 * isInt(0.1) // => false
 */
export const isInt = /* @__PURE__ */ (() => Number.isInteger)() as (
  value: unknown,
) => value is number;
