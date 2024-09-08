import { useEffect, useLayoutEffect, useRef } from "react";

type ClickCallback = (e: Event) => void;

/**
 * Trigger a callback when clicking outside of an element
 *
 * @param cb - Callback function to be triggered when clicking outside of the element
 *
 * @example
 * ```tsx
 * const App = () => {
 *   const ref = useClickAway(() => console.log("Clicked outside!"));
 *   return <div ref={ref}>Click outside of me</div>;
 * };
 * ```
 */
export function useClickAway(cb: ClickCallback) {
  const ref = useRef(null);
  const refCb = useRef<ClickCallback>(cb);

  useLayoutEffect(() => {
    refCb.current = cb;
  });

  useEffect(() => {
    const handler = (e: Event) => {
      const element = ref.current;
      if (element && !(element as HTMLElement).contains(e.target as Node)) {
        refCb.current(e);
      }
    };

    document.addEventListener("mousedown", handler);
    document.addEventListener("touchstart", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
      document.removeEventListener("touchstart", handler);
    };
  }, []);

  return ref;
}
