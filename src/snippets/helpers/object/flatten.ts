import { objectify } from "@/snippets/helpers/array/objectify";
import { keys } from "@/snippets/helpers/object/keys";
import { get } from "@/snippets/helpers/object/get";

/* Flattens a deep object to a single demension, converting the keys to dot notation. */
export function flatten<TValue extends object>(value: TValue): object {
  if (!value) return {};
  return objectify(
    keys(value),
    (k) => k,
    (k) => get(value, k),
  );
}
