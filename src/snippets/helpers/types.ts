declare const any: unique symbol;

/**
 * The `AggregateError` object represents an error when several errors
 * need to be wrapped in a single error.
 *
 * As this error type is relatively new, it's not available in every
 * environment (last checked on July 20, 2024).
 * When it's not globally defined, we provide a polyfill.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/AggregateError
 */
const AggregateErrorOrPolyfill: AggregateErrorConstructor =
  /* @__PURE__ */ (() =>
    // eslint-disable-next-line compat/compat
    globalThis.AggregateError ??
    (class AggregateError extends Error {
      errors: Error[];
      constructor(errors: Error[] = []) {
        super();
        const name = errors.find((e) => e.name)?.name ?? "";
        this.name = `AggregateError(${name}...)`;
        this.message = `AggregateError with ${errors.length} errors`;
        this.stack = errors.find((e) => e.stack)?.stack ?? this.stack;
        this.errors = errors;
      }
    } as unknown as AggregateErrorConstructor))();

// Do not export directly, so the polyfill isn't renamed to
// `AggregateError2` at build time (which ESBuild does to prevent
// variable shadowing).
export { AggregateErrorOrPolyfill as AggregateError };

/**
 * The `Any` class does not exist at runtime. It's used in type
 * definitions to detect an `any` type.
 *
 * ```ts
 * type IsAny<T> = [T] extends [Any] ? 'is any' : 'is not any'
 * ```
 */
export declare class Any {
  private any: typeof any;
}

/**
 * Extracts `T` if `T` is not `any`, otherwise `never`.
 *
 * ```ts
 * type A = ExtractNotAny<any, string>
 * //   ^? never
 * type B = ExtractNotAny<string | number, string>
 * //   ^? string
 * ```
 */
export type ExtractNotAny<T, U> = Extract<[T] extends [Any] ? never : T, U>;

export type SwitchAny<T, U> = [T] extends [Any] ? U : T;
export type SwitchNever<T, U> = [T] extends [never] ? U : T;

/**
 * Extract types in `T` that are assignable to `U`. Coerce `any` and
 * `never` types to unknown.
 */
export type StrictExtract<T, U> = SwitchNever<
  Extract<SwitchAny<T, unknown>, U>,
  unknown
>;

/**
 * Resolve a type union of property name literals within type `T`
 * whose property values are assignable to type `CompatibleValue`.
 *
 * Use case: “I want to know which properties of `T` are compatible
 * with `CompatibleValue`.”
 */
export type CompatibleProperty<T, CompatibleValue> = [T] extends [Any]
  ? keyof any
  : T extends null | undefined
    ? never
    : {
        [P in keyof BoxedPrimitive<T>]: BoxedPrimitive<T>[P] extends CompatibleValue
          ? P
          : never;
      }[keyof BoxedPrimitive<T>];

/**
 * Coerce a primitive type to its boxed equivalent.
 *
 * @example
 * ```ts
 * type A = BoxedPrimitive<string>
 * //   ^? String
 * type B = BoxedPrimitive<number>
 * //   ^? Number
 * ```
 */
export type BoxedPrimitive<T> = T extends string
  ? // biome-ignore lint/complexity/noBannedTypes:
    String
  : T extends number
    ? // biome-ignore lint/complexity/noBannedTypes:
      Number
    : T extends boolean
      ? // biome-ignore lint/complexity/noBannedTypes:
        Boolean
      : T extends bigint
        ? // biome-ignore lint/complexity/noBannedTypes:
          BigInt
        : T extends symbol
          ? // biome-ignore lint/complexity/noBannedTypes:
            Symbol
          : T;

/**
 * A value that can be reliably compared with JavaScript comparison
 * operators (e.g. `>`, `>=`, etc).
 */
export type Comparable =
  | number
  | string
  | bigint
  | { valueOf: () => number | string | bigint }
  | { [Symbol.toPrimitive](hint: "number"): number }
  | { [Symbol.toPrimitive](hint: "string"): string };

/**
 * Extract a string union of property names from type `T` whose value
 * can be compared with `>`, `>=`, etc.
 */
export type ComparableProperty<T> = CompatibleProperty<T, Comparable>;

/**
 * A comparator function. It can be passed to the `sort` method of
 * arrays to sort the elements.
 *
 * Return a negative number to sort the “left” value before the “right”
 * value, a positive number to sort the “right” value before the “left”
 * value, and 0 to keep the order of the values.
 */
export type Comparator<T> = (left: T, right: T) => number;

/** Convert a union to an intersection */
export type Intersect<U> = (U extends any ? (k: U) => void : never) extends (
  k: infer I,
) => void
  ? I
  : never;

/**
 * Useful to flatten the type output to improve type hints shown in
 * editors. And also to transform an interface into a type to aide
 * with assignability.
 *
 * @see https://github.com/microsoft/TypeScript/issues/15300
 */
export type Simplify<T> = {} & { [P in keyof T]: T[P] };
