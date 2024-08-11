import { isObject } from "@/snippets/helpers/typed/is-array";

function getKeys(nested: any, paths: string[]): string[] {
  if (isObject(nested)) {
    return Object.entries(nested).flatMap(([k, v]) =>
      getKeys(v, [...paths, k]),
    );
  }

  if (Array.isArray(nested)) {
    return nested.flatMap((item, i) => getKeys(item, [...paths, `${i}`]));
  }

  return [paths.join(".")];
}

/* Get a string list of all key names that exist in an object (deep). */
export function keys<TValue extends object>(value: TValue): string[] {
  if (!value) return [];
  return getKeys(value, []);
}
