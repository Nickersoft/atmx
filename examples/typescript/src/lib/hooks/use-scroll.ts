import * as React from "react";

import { useRafState } from "@/lib/hooks/use-raf-state.js";
import { isDev } from "@/lib/helpers/is-dev.js";

export interface State {
  x: number;
  y: number;
}

/**
 * Tracks the current scroll position of the provided element.
 * @param ref - The element to monitor for scrolling.
 *
 * @example
 * ```tsx
 * import { useRef } from "react";
 *
 * import { useScroll } from "@/hooks/browser/use-scroll";
 *
 * const Component = () => {
 *  const ref = useRef<HTMLDivElement>(null);
 *  const { x, y } = useScroll(ref);
 *
 *  return (
 *    <div ref={ref}>
 *      <p>Scroll X: {x}</p>
 *      <p>Scroll Y: {y}</p>
 *    </div>
 *  );
 * };
 * ```
 *
 * @returns The current scroll position of the provided element.
 */
const useScroll = (ref: React.RefObject<HTMLElement>): State => {
  if (isDev()) {
    if (typeof ref !== "object" || typeof ref.current === "undefined") {
      console.error("`useScroll` expects a single ref argument.");
    }
  }

  const [state, setState] = useRafState<State>({
    x: 0,
    y: 0,
  });

  React.useEffect(() => {
    const handler = () => {
      if (ref.current) {
        setState({
          x: ref.current?.scrollLeft,
          y: ref.current?.scrollTop,
        });
      }
    };

    ref.current?.addEventListener("scroll", handler, {
      capture: false,
      passive: true,
    });

    return () => {
      ref.current?.addEventListener("scroll", handler);
    };
  }, [ref]);

  return state;
};

export default useScroll;
