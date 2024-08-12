/**
 * Formats the given string in pascal case fashion.
 *
 * @example
 * pascal('hello world') // => 'HelloWorld'
 * pascal('va va boom') // => 'VaVaBoom'
 */
export function pascal(str: string): string {
  const parts = str?.split(/[\.\-\s_]/).map((x) => x.toLowerCase()) ?? [];
  if (parts.length === 0) {
    return "";
  }
  return parts
    .map((str) => str.charAt(0).toUpperCase() + str.slice(1))
    .join("");
}
