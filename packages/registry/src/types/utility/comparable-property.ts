import type { Comparable } from "@/types/extensions/comparable.ts";
import type { CompatibleProperty } from "@/types/utility/compatible-property.ts";

/**
 * Extract a string union of property names from type `T` whose value
 * can be compared with `>`, `>=`, etc.
 */
export type ComparableProperty<T> = CompatibleProperty<T, Comparable>;
