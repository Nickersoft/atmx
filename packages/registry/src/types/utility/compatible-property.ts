import type { BoxedPrimitive } from "@/types/extensions/boxed-primitive.js";
import type { Any } from "@/types/extensions/any.js";

/**
 * Resolves a type union of property name literals within type `T`
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
