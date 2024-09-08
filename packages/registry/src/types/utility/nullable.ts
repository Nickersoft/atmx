/**
 * Transforms a type into a nullable type.
 *
 * @example
 * type A = Nullable<string> // string | null
 */
export type Nullable<T> = T | null;
