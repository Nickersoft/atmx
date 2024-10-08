/**
 * Creates a Proxy object that will dynamically call the handler
 * argument when attributes are accessed.
 *
 * @example
 * const proxy = proxied(propertyName => propertyName.toUpperCase())
 * proxy.foo // => "FOO"
 */
export function proxied<T, K>(
  handler: (propertyName: T) => K,
): Record<string, K> {
  return new Proxy(
    {},
    {
      get: (_, propertyName: any) => handler(propertyName),
    },
  );
}
