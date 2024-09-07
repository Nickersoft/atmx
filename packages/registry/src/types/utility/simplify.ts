/**
 * Transform an interface into a type to aide with assignability.
 *
 * @see https://github.com/microsoft/TypeScript/issues/15300
 *
 * @example
 * interface A { a: number }
 * type B = Simplify<A> // ^?{ a: number }
 */
export type Simplify<T> = {} & { [P in keyof T]: T[P] };
