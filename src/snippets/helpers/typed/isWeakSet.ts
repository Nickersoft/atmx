import { isTagged } from "@/snippets/helpers/typed/isTagged";

/**
 * Checks if the given value is a WeakSet.
 *
 * Instances from [other realms][1] are also supported.
 *
 * [1]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/instanceof#instanceof_and_multiple_realms
 *
 * @example
 *
 * isWeakSet(new WeakSet()) // => true
 * isWeakSet(new Set()) // => false
 */
export function isWeakSet<T extends WeakKey = WeakKey>(
  value: unknown,
): value is WeakSet<T> {
  return isTagged(value, "[object WeakSet]");
}
