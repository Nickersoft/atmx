import { isNumber } from "@/helpers/validation/is-number.js";

/**
 * Return true if the given value is a number that is not an integer.
 *
 * @example
 * isFloat(0) // => false
 * isFloat(0.1) // => true
 */
export function isFloat(value: any): value is number {
  return isNumber(value) && value % 1 !== 0;
}
