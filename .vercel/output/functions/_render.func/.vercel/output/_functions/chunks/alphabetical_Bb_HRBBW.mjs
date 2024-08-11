const alphabetical = '/* Sorts an array of string in alphabetical order */\nexport function alphabetical<T>(\n  array: readonly T[],\n  getter: (item: T) => string,\n  dir: "asc" | "desc" = "asc",\n) {\n  if (!array) return [];\n  const asc = (a: T, b: T) => `${getter(a)}`.localeCompare(getter(b));\n  const dsc = (a: T, b: T) => `${getter(b)}`.localeCompare(getter(a));\n  return array.slice().sort(dir === "desc" ? dsc : asc);\n}\n';

export { alphabetical as default };
