import { useCallback, useRef, useState } from "react";

import type { Nullable } from "@/types/utility/nullable.ts";

interface CounterOptions {
  min?: Nullable<number>;
  max?: Nullable<number>;
}

interface CounterActions {
  increment: (amount?: number) => void;
  decrement: (amount?: number) => void;
  set: (nextCount: number) => void;
  reset: (to?: number) => void;
}

/**
 * Create a counter with increment, decrement, set, and reset actions.
 *
 * @param startingValue - The initial value of the counter
 * @param options - The options for the counter
 *
 * @example
 * ```tsx
 * const App = () => {
 *  const [count, { increment, decrement, set, reset }] = useCounter(5, { min: 0, max: 10 });
 *
 *  return (
 *    <div>
 *      <p>{count}</p>
 *      <button onClick={increment}>Increment</button>
 *      <button onClick={decrement}>Decrement</button>
 *      <button onClick={() => set(5)}>Set to 5</button>
 *      <button onClick={() => reset()}>Reset</button>
 *    </div>
 *  );
 * };
 * ```
 */
export function useCounter(
  startingValue: number = 0,
  options: CounterOptions = {},
): [number, CounterActions] {
  const { min, max } = options;

  const initialValue = useRef(startingValue);

  if (typeof min === "number" && typeof max === "number" && min > max) {
    throw new Error(`Your min of ${min} is greater than your max of ${max}.`);
  }

  if (typeof min === "number" && startingValue < min) {
    throw new Error(
      `Your starting value of ${startingValue} is less than your min of ${min}.`,
    );
  }

  if (typeof max === "number" && startingValue > max) {
    throw new Error(
      `Your starting value of ${startingValue} is greater than your max of ${max}.`,
    );
  }

  const [count, setCount] = useState(startingValue);

  const increment = useCallback(
    (amount: number = 1) => {
      setCount((c) => {
        const nextCount = c + amount;

        if (typeof max === "number" && nextCount > max) {
          return c;
        }

        return nextCount;
      });
    },
    [max],
  );

  const decrement = useCallback(
    (amount: number = 1) => {
      setCount((c) => {
        const nextCount = c - amount;

        if (typeof min === "number" && nextCount < min) {
          return c;
        }

        return nextCount;
      });
    },
    [min],
  );

  const set = useCallback(
    (nextCount: number) => {
      setCount((c) => {
        if (typeof max === "number" && nextCount > max) {
          return c;
        }

        if (typeof min === "number" && nextCount < min) {
          return c;
        }

        return nextCount;
      });
    },
    [max, min],
  );

  const reset = useCallback(
    (to: number = initialValue.current) => {
      if (typeof max === "number" && to > max) {
        to = max;
      }

      if (typeof min === "number" && to < min) {
        to = min;
      }

      setCount(to);

      if (initialValue.current !== to) {
        initialValue.current = to;
      }
    },
    [initialValue.current],
  );

  return [count, { increment, decrement, set, reset }];
}
