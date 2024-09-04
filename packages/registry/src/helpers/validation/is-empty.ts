import { isNumber } from "@/helpers/validation/is-number.js";
import { isDate } from "@/helpers/validation/is-date.js";
import { isFunction } from "@/helpers/validation/is-function.js";
import { isSymbol } from "@/helpers/validation/is-symbol.js";

/**
 * Return true if the given value is empty.
 *
 * Empty values include:
 * - `null`
 * - `undefined`
 * - `0`
 * - `NaN`
 * - `''`
 * - `[]`
 * - `{}`
 * - invalid `Date` time
 * - object with `length` property of `0`
 * - object with `size` property of `0`
 * - object with no enumerable keys
 *
 * @example
 * isEmpty(0) // => true
 * isEmpty(null) // => true
 * isEmpty(undefined) // => true
 * isEmpty([]) // => true
 * isEmpty({}) // => true
 */
export function isEmpty(value: any): boolean {
  if (value === true || value === false) {
    return true;
  }

  if (value === null || value === undefined) {
    return true;
  }

  if (isNumber(value)) {
    return value === 0;
  }

  if (isDate(value)) {
    return Number.isNaN(value.getTime());
  }

  if (isFunction(value)) {
    return false;
  }

  if (isSymbol(value)) {
    return false;
  }

  const length = (value as any).length;

  if (isNumber(length)) {
    return length === 0;
  }

  const size = (value as any).size;

  if (isNumber(size)) {
    return size === 0;
  }

  return Object.keys(value).length === 0;
}
