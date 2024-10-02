import * as React from "react";

import { useIsomorphicLayoutEffect } from "@/lib/hooks/use-isomorphic-layout-effect.js";
import { isBrowser } from "@/lib/helpers/is-browser.js";

export type UseMeasureRect = Pick<
  DOMRectReadOnly,
  "x" | "y" | "top" | "left" | "right" | "bottom" | "height" | "width"
>;

export type UseMeasureRef<E extends Element = Element> = (element: E) => void;

export type UseMeasureResult<E extends Element = Element> = [
  UseMeasureRef<E>,
  UseMeasureRect,
];

const defaultState: UseMeasureRect = {
  x: 0,
  y: 0,
  width: 0,
  height: 0,
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,
};

function useMeasure<E extends Element = Element>(): UseMeasureResult<E> {
  const [element, ref] = React.useState<E | null>(null);
  const [rect, setRect] = React.useState<UseMeasureRect>(defaultState);

  const observer = React.useMemo(
    () =>
      new window.ResizeObserver((entries: ResizeObserverEntry[]) => {
        if (entries[0]) {
          const { x, y, width, height, top, left, bottom, right } =
            entries[0].contentRect;
          setRect({ x, y, width, height, top, left, bottom, right });
        }
      }),
    [],
  );

  useIsomorphicLayoutEffect(() => {
    if (!element) return;
    observer.observe(element);
    return () => {
      observer.disconnect();
    };
  }, [element]);

  return [ref, rect];
}

const fallback = (() => [() => {}, defaultState]) as typeof useMeasure;

export default isBrowser() && typeof window.ResizeObserver !== "undefined"
  ? useMeasure
  : fallback;
