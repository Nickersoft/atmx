/**
 * Check if the current Node environment is "development"
 * @returns True if the current environment is development, false otherwise.
 */
export function isDev() {
  return (
    process.env.NODE_ENV === "dev" ||
    process.env.NODE_ENV === "development" ||
    process.env.NODE_ENV === undefined
  );
}
