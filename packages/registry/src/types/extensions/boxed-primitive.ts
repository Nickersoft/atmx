/**
 * Coerce a primitive type to its boxed equivalent.
 *
 * @example
 * type A = BoxedPrimitive<string> // ^? String
 * type B = BoxedPrimitive<number> // ^? Number
 */
export type BoxedPrimitive<T> = T extends string
  ? String
  : T extends number
    ? Number
    : T extends boolean
      ? Boolean
      : T extends bigint
        ? BigInt
        : T extends symbol
          ? Symbol
          : T;
