import { useCallback, useState } from "react";

import type { Nullable } from "@/types/utility/nullable.ts";

/**
 * Copies the given value to the clipboard using the Navigator API.
 *
 * @example
 * export function MyComponent() {
 *   const [state, copyToClipboard] = useCopyToClipboard();
 *
 *   copyToClipboard("Hello, world!");
 *
 *   return <div>{state ? `Copied: ${state}` : "Copy something!"}</div>;
 * }
 */
export function useCopyToClipboard() {
  const [state, setState] = useState<Nullable<string>>(null);

  const copyToClipboard = useCallback((value: string) => {
    const handleCopy = async () => {
      await copyToClipboard(value);
      setState(value);
    };
    handleCopy();
  }, []);

  return [state, copyToClipboard];
}
