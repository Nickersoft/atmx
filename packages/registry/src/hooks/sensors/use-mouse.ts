import * as React from "react";

interface MouseState {
  x: number;
  y: number;
  elementX: number;
  elementY: number;
  elementPositionX: number;
  elementPositionY: number;
}

/**
 * Tracks the current mouse position in relation to both the window and a provided element ref.
 * @param ref - The element to monitor.
 *
 * @example
 * ```tsx
 * import { useRef } from "react";
 *
 * import { useMouse } from "@/hooks/sensors/use-mouse";
 *
 * const Component = () => {
 *   const ref = useRef<HTMLDivElement>(null);
 *   const { x, y, elementX, elementY, elementPositionX, elementPositionY } = useMouse(ref);
 *
 *   return (
 *     <div ref={ref}>
 *      <p>Mouse X: {x}</p>
 *      <p>Mouse Y: {y}</p>
 *      <p>Element Mouse X: {elementX}</p>
 *      <p>Element Mouse Y: {elementY}</p>
 *      <p>Element Position X: {elementPositionX}</p>
 *      <p>Element Position Y: {elementPositionY}</p>
 *     </div>
 *   );
 * };
 *
 * ```
 *
 * @returns The current mouse positions.
 */
export function useMouse<T extends HTMLElement>(): [
  MouseState,
  React.RefObject<T | null>,
] {
  const [state, setState] = React.useState<MouseState>({
    x: 0,
    y: 0,
    elementX: 0,
    elementY: 0,
    elementPositionX: 0,
    elementPositionY: 0,
  });

  const ref = React.useRef<T | null>(null);

  React.useLayoutEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      let newState: Partial<MouseState> = {
        x: event.pageX,
        y: event.pageY,
      };

      if (ref.current?.nodeType === Node.ELEMENT_NODE) {
        const { left, top } = ref.current.getBoundingClientRect();

        const elementPositionX = left + window.scrollX;
        const elementPositionY = top + window.scrollY;
        const elementX = event.pageX - elementPositionX;
        const elementY = event.pageY - elementPositionY;

        newState.elementX = elementX;
        newState.elementY = elementY;
        newState.elementPositionX = elementPositionX;
        newState.elementPositionY = elementPositionY;
      }

      setState((s) => {
        return {
          ...s,
          ...newState,
        };
      });
    };

    document.addEventListener("mousemove", handleMouseMove);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return [state, ref];
}
