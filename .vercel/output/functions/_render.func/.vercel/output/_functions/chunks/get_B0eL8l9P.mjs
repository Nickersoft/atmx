const get = `/* Dynamically get a nested value from an array or object with a string. */
export function get<TDefault = unknown>(
  value: any,
  path: string,
  defaultValue?: TDefault,
): TDefault {
  const segments = path.split(/[\\.\\[\\]]/g);

  let current: any = value;

  for (const key of segments) {
    if (current === null || current === undefined) {
      return defaultValue as TDefault;
    }

    const dequoted = key.replace(/['"]/g, "");

    if (dequoted.trim() === "") {
      continue;
    }

    current = current[dequoted];
  }

  if (current === undefined) {
    return defaultValue as TDefault;
  }

  return current;
}
`;

export { get as default };
