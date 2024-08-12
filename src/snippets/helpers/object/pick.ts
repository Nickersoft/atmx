type KeyOf<T extends object> = object extends T ? keyof any : keyof T;
type ValueOf<T extends object> = object extends T ? unknown : T[keyof T];

export type KeyFilterFunction<T extends object = object> = (
  value: ValueOf<T>,
  key: KeyOf<T>,
  obj: T,
) => boolean;

/**
 * Functions can use this type to accept either an array of keys or a
 * filter function.
 */
export type KeyFilter<
  T extends object = object,
  Key extends keyof any = keyof any,
> = KeyFilterFunction<T> | readonly Key[];

/**
 * Extract the keys of an object that pass a filter.
 */
export type FilteredKeys<
  T extends object,
  F extends KeyFilter<T> | null | undefined,
> = Extract<keyof T, F extends readonly any[] ? F[number] : any>;

import { isArray } from "@/snippets/helpers/typed/isArray";

/**
 * Pick a list of properties from an object into a new object.
 *
 * ⚠️ When used with a predicate function, `pick` is potentially
 * unsafe, because of partial type matching performed by TypeScript.
 * If you pass an object with more properties than its TypeScript type
 * has listed, the `value` and `key` parameter types of your callback
 * will be inaccurate.
 *
 * @example
 * const a = { a: 1, b: 2, c: 3 }
 *
 * pick(a, ['a', 'c']) // => { a: 1, c: 3 }
 * pick(a, (value, key) => value > 1) // => { b: 2, c: 3 }
 */
export function pick<T extends object, F extends KeyFilter<T, keyof T>>(
  obj: T,
  filter: F,
): Pick<T, FilteredKeys<T, F>>;

export function pick<T extends object>(
  obj: T,
  filter: KeyFilter<T, keyof T> | null,
) {
  if (!obj) {
    return {};
  }

  let keys: (keyof T)[] = filter as any;

  if (isArray(filter)) {
    filter = null;
  } else {
    keys = Reflect.ownKeys(obj) as (keyof T)[];
  }

  return keys.reduce((acc, key) => {
    const hasKey =
      Object.hasOwnProperty.call(obj, key) &&
      (filter == null || filter((obj as any)[key], key, obj));

    if (hasKey) {
      acc[key] = obj[key];
    }

    return acc;
  }, {} as T);
}
