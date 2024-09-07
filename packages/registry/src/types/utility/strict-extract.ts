import type { Any } from "@/types/extensions/any.js";

export type SwitchAny<T, U> = [T] extends [Any] ? U : T;

export type SwitchNever<T, U> = [T] extends [never] ? U : T;

/**
 * Extract types in `T` that are assignable to `U`.
 * Coerce `any` and `never` types to unknown.
 *
 * @example
 * StrictExtract<string | number | boolean, string> // ^? string
 */
export type StrictExtract<T, U> = SwitchNever<
  Extract<SwitchAny<T, unknown>, U>,
  unknown
>;
