import { isString } from "@/snippets/helpers/typed/isString";

/**
 * Return true if the given value is a string that can be parsed as an
 * integer.
 *
 * @example
 * isIntString('0') // => true
 * isIntString('0.1') // => false
 * isIntString('+1') // => false
 */
export function isIntString(value: any): value is string {
  if (!isString(value)) {
    return false;
  }
  const num = +value;
  return Number.isInteger(num) && `${num}` === value;
}
