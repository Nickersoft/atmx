declare const setTimeout: (fn: () => void, ms: number) => unknown;

/**
 * Create a promise that resolves after a given amount of time.
 *
 * @example
 * await sleep(1000)
 */
export function sleep(milliseconds: number): Promise<void> {
  return new Promise((res) => setTimeout(res, milliseconds));
}
