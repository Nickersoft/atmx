declare const any: unique symbol;

/**
 * Virtual class used in type definitions to detect an `any` type.
 *
 * @example
 * type IsAny<T> = [T] extends [Any] ? 'is any' : 'is not any'
 */
export declare class Any {
  private any: typeof any;
}
