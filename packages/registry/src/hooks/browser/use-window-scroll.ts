import { useEffect } from "react";

import { useRafState } from "@/hooks/animations/use-raf-state.ts";

export interface WindowScrollState {
  x: number;
  y: number;
}

/**
 * Tracks the current window scroll position.
 *
 * @returns The current window scroll position.
 *
 * @example
 * ```tsx
 * import { useWindowScroll } from "@/hooks/browser/use-window-scroll";
 *
 * const Component = () => {
 *    const { x, y } = useWindowScroll();
 *
 *    return (
 *      <div>
 *        <p>Window Scroll X: {x}</p>
 *        <p>Window Scroll Y: {y}</p>
 *      </div>
 *    );
 * };
 * ```
 */
const useWindowScroll = (): WindowScrollState => {
  const isBrowser = typeof window !== "undefined";

  const [state, setState] = useRafState<WindowScrollState>(() => ({
    x: isBrowser ? window.scrollX : 0,
    y: isBrowser ? window.scrollY : 0,
  }));

  useEffect(() => {
    const handler = () => {
      setState((state) => {
        const { scrollX, scrollY } = window;
        // Check state for change, return same state if no change happened to prevent rerender
        // (see useState/setState documentation). useState/setState is used internally in useRafState/setState.
        return state.x !== scrollX || state.y !== scrollY
          ? { x: scrollX, y: scrollY }
          : state;
      });
    };

    // We have to update window scroll at mount, before subscription.
    // Window scroll may be changed between render and effect handler.
    handler();

    window.addEventListener("scroll", handler, {
      capture: false,
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handler);
    };
  }, []);

  return state;
};

export default useWindowScroll;
