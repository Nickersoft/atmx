import { capitalize } from "@/helpers/strings/capitalize.js";

/**
 * Formats the given string in title case fashion.
 *
 * @example
 * title('hello world') // => 'Hello World'
 * title('va_va_boom') // => 'Va Va Boom'
 * title('root-hook') // => 'Root Hook'
 * title('queryItems') // => 'Query Items'
 */
export function title(str: string | null | undefined): string {
  if (!str) {
    return "";
  }
  return str
    .split(/(?=[A-Z])|[\.\-\s_]/)
    .map((s) => s.trim())
    .filter((s) => !!s)
    .map((s) => capitalize(s.toLowerCase()))
    .join(" ");
}
