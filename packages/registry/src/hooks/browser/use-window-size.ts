import * as React from "react";

import { useRafState } from "@/hooks/animations/use-raf-state.ts";
import { isBrowser } from "@/helpers/browser/is-browser.ts";

/**
 * Tracks the current window size.
 *
 * @param initialWidth Manually set the initial width on the server.
 * @param initialHeight Manually set the initial height on the server.
 *
 * @example
 * ```tsx
 * import { useWindowSize } from "@/hooks/browser/use-window-size";
 *
 * const Component = () => {
 *   const { width, height } = useWindowSize();
 *
 *   return (
 *     <div>
 *       <p>Window Width: {width}</p>
 *       <p>Window Height: {height}</p>
 *     </div>
 *   );
 * };
 * ```
 *
 * @returns The current window size.
 */
export function useWindowSize(
  initialWidth = Number.POSITIVE_INFINITY,
  initialHeight = Number.POSITIVE_INFINITY,
) {
  const browser = isBrowser();

  const [state, setState] = useRafState<{ width: number; height: number }>({
    width: browser ? window.innerWidth : initialWidth,
    height: browser ? window.innerHeight : initialHeight,
  });

  React.useEffect((): (() => void) | void => {
    if (browser) {
      const handler = () => {
        setState({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      };

      window.addEventListener("resize", handler);

      return () => {
        window.addEventListener("resize", handler);
      };
    }
  }, []);

  return state;
}
