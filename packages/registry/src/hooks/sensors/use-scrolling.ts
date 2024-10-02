import { type RefObject, useEffect, useState } from "react";

/**
 * Determines if the user is actively scrolling within the provided element.
 *
 * @param ref - The element to monitor for scrolling.
 *
 * @returns True if the user is actively scrolling, false otherwise.
 *
 * @example
 * ```tsx
 * import { useRef } from "react";
 *
 * import { useScrolling } from "@/hooks/use-scrolling";
 *
 * const Component = () => {
 *  const ref = useRef<HTMLDivElement>(null);
 *  const scrolling = useScrolling(ref);
 *
 *  return (
 *    <div ref={ref}>
 *      {scrolling ? "Scrolling" : "Not scrolling"}
 *    </div>
 *  );
 * };
 * ```
 */
export function useScrolling(ref: RefObject<HTMLElement>): boolean {
  const [scrolling, setScrolling] = useState<boolean>(false);

  useEffect(() => {
    if (ref.current) {
      let scrollingTimeout: Timer;

      function handleScrollEnd() {
        setScrolling(false);
      }

      function handleScroll() {
        setScrolling(true);
        clearTimeout(scrollingTimeout);
        scrollingTimeout = setTimeout(() => handleScrollEnd(), 150);
      }

      ref.current?.addEventListener("scroll", handleScroll, false);

      return () => {
        ref.current?.removeEventListener("scroll", handleScroll, false);
      };
    }
    return () => {};
  }, [ref]);

  return scrolling;
}

export default useScrolling;
