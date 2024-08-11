const objectify = "/**\n * Convert an array to a dictionary by mapping each item\n * into a dictionary key & value\n */\nexport function objectify<T, Key extends string | number | symbol, Value = T>(\n  array: readonly T[],\n  getKey: (item: T) => Key,\n  getValue: (item: T) => Value = (item) => item as unknown as Value,\n): Record<Key, Value> {\n  return array.reduce(\n    (acc, item) => {\n      acc[getKey(item)] = getValue(item);\n      return acc;\n    },\n    {} as Record<Key, Value>,\n  );\n}\n";

export { objectify as default };
