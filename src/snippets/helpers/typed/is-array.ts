/* Determines whether a value is an object */
export function isObject(value: any): value is object {
  return !!value && value.constructor === Object;
}
