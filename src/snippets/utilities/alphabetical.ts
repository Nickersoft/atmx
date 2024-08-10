/* Sorts an array of string in alphabetical order */
export function alphabetical<T>(
  array: readonly T[],
  getter: (item: T) => string,
  dir: "asc" | "desc" = "asc",
) {
  if (!array) return [];
  const asc = (a: T, b: T) => `${getter(a)}`.localeCompare(getter(b));
  const dsc = (a: T, b: T) => `${getter(b)}`.localeCompare(getter(a));
  return array.slice().sort(dir === "desc" ? dsc : asc);
}
