import * as React from "react";

/**
 * Debounces a value.
 *
 * @param value - The value to debounce.
 * @param delay - The delay in milliseconds.
 *
 * @example
 * ```tsx
 * import { useState } from "react";
 *
 * import { useDebounce } from "@/hooks/effects/use-debounce";
 *
 * const Component = () => {
 *
 *  const [value, setValue] = useState("");
 *
 *  const debouncedValue = useDebounce(value, 500);
 *
 *  return (
 *   <input
 *     value={value}
 *     onChange={(event) => setValue(event.target.value)}
 *   />
 *  );
 * };
 * ```
 *
 * @returns The debounced value.
 */
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = React.useState(value);

  React.useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}
