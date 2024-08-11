const group = "/* Sorts an array of items into groups */\nexport const group = <T, Key extends string | number | symbol>(\n  array: readonly T[],\n  getGroupId: (item: T) => Key,\n): Partial<Record<Key, T[]>> => {\n  return array.reduce(\n    (acc, item) => {\n      const groupId = getGroupId(item);\n\n      if (!acc[groupId]) {\n        acc[groupId] = [];\n      }\n\n      acc[groupId].push(item);\n\n      return acc;\n    },\n    {} as Record<Key, T[]>,\n  );\n};\n";

export { group as default };
