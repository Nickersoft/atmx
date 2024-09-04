/**
 * Checks if the given value is a symbol.
 *
 * @example
 * isSymbol(Symbol('abc')) // => true
 * isSymbol('abc') // => false
 */
export function isSymbol(value: unknown): value is symbol {
  return typeof value === "symbol";
}
