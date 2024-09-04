import { isTagged } from "@/helpers/validation/is-tagged.js";

/**
 * Checks if the given value is a WeakMap.
 *
 * Instances from [other realms][1] are also supported.
 *
 * [1]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/instanceof#instanceof_and_multiple_realms
 *
 * @example
 * isWeakMap(new WeakMap()) // => true
 * isWeakMap(new Map()) // => false
 */
export function isWeakMap<K extends WeakKey = WeakKey, V = unknown>(
  value: unknown,
): value is WeakMap<K, V> {
  return isTagged(value, "[object WeakMap]");
}
