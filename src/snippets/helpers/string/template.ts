/**
 * Replace data by name in template strings. The default expression
 * looks for `{{name}}` to identify names.
 *
 * @example
 * template('Hello, {{name}}', { name: 'world' }) // "Hello, world"
 * template('Hello, <name>', { name: 'world' }, /<(.+?)>/g) // "Hello, world"
 */
export function template(
  str: string,
  data: Record<string, any>,
  regex: RegExp = /\{\{(.+?)\}\}/g,
): string {
  let result = "";
  let from = 0;
  let match: RegExpExecArray | null;
  while ((match = regex.exec(str))) {
    result += str.slice(from, match.index) + data[match[1]];
    from = regex.lastIndex;
  }
  return result + str.slice(from);
}
