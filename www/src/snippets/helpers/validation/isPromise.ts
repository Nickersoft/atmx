import { isFunction } from "@/snippets/helpers/typed/isFunction";

/**
 * Returns true if the value is a Promise or has a `then` method.
 *
 * @example
 * isPromise(Promise.resolve(1)) // => true
 * isPromise({ then() {} }) // => true
 * isPromise(1) // => false
 */
export function isPromise(value: any): value is Promise<any> {
  return !!value && isFunction(value.then);
}
