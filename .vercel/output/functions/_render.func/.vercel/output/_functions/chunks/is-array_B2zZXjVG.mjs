const isArray = "/* Determines whether a value is an object */\nexport function isObject(value: any): value is object {\n  return !!value && value.constructor === Object;\n}\n";

export { isArray as default };
