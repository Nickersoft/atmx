const flatten = 'import { objectify } from "@/snippets/helpers/array/objectify";\nimport { keys } from "@/snippets/helpers/object/keys";\nimport { get } from "@/snippets/helpers/object/get";\n\n/* Flattens a deep object to a single demension, converting the keys to dot notation. */\nexport function flatten<TValue extends object>(value: TValue): object {\n  if (!value) return {};\n  return objectify(\n    keys(value),\n    (k) => k,\n    (k) => get(value, k),\n  );\n}\n';

export { flatten as default };
