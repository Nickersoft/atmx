import * as React from "react";

/**
 * A hook that uses requestAnimationFrame to update state.
 * @param initialState - The initial state of the hook.
 *
 * @example
 * ```tsx
 *  const Component = () => {
 *    const [value, setValue] = useRafState(0);
 *
 *    return (
 *      <button onClick={() => setValue((value) => value + 1)}>
 *        {value}
 *      </button>
 *    );
 *  };
 * ```
 *
 * @returns The current state and a function to update it.
 */
export function useRafState<S>(
  initialState: S | (() => S),
): [S, React.Dispatch<React.SetStateAction<S>>] {
  const frame = React.useRef(0);

  const [state, setState] = React.useState(initialState);

  const setRafState = React.useCallback((value: S | ((prevState: S) => S)) => {
    cancelAnimationFrame(frame.current);

    frame.current = requestAnimationFrame(() => {
      setState(value);
    });
  }, []);

  React.useEffect(() => () => cancelAnimationFrame(frame.current));

  return [state, setRafState];
}
