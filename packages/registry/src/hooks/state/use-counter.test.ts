import { it, expect, describe, spyOn } from "bun:test";
import { act, renderHook } from "@testing-library/react";

import { useCounter } from "./use-counter.ts";

const setUp = (
  initialValue?: number,
  max: number | null = null,
  min: number | null = null,
) => renderHook(() => useCounter(initialValue, { max, min }));

it("should init counter and utils", () => {
  const { result } = setUp(5);

  expect(result.current[0]).toBe(5);
  expect(result.current).toStrictEqual([
    expect.any(Number),
    {
      increment: expect.any(Function),
      decrement: expect.any(Function),
      set: expect.any(Function),
      reset: expect.any(Function),
    },
  ]);
});

it("should init counter to 0 if not initial value received", () => {
  const { result } = setUp();
  expect(result.current[0]).toBe(0);
});

it("should init counter to negative number", () => {
  const { result } = setUp(-2);

  expect(result.current[0]).toBe(-2);
});

it("should get current counter", () => {
  const { result } = setUp(5);
  const [count] = result.current;
  expect(count).toBe(5);
});

it("should increment by 1 if not value received", () => {
  const { result } = setUp(5);
  const { increment } = result.current[1];
  act(() => increment());
  expect(result.current[0]).toBe(6);
});

it("should increment by value received", () => {
  const { result } = setUp(5);
  const { increment } = result.current[1];
  act(() => increment(9));
  expect(result.current[0]).toBe(14);
});

it("should decrement by 1 if not value received", () => {
  const { result } = setUp(5);
  const { decrement } = result.current[1];

  act(() => decrement());

  expect(result.current[0]).toBe(4);
});

it("should decrement by value received", () => {
  const { result } = setUp(5);
  const { decrement } = result.current[1];
  act(() => decrement(9));
  expect(result.current[0]).toBe(-4);
});

it("should set to value received", () => {
  const { result } = setUp(5);
  const { set } = result.current[1];
  act(() => set(17));
  expect(result.current[0]).toBe(17);
});

it("should reset to original value", () => {
  const { result } = setUp(5);
  const { set, reset } = result.current[1];

  // set different value than initial one...
  act(() => set(17));
  expect(result.current[0]).toBe(17);

  // ... and reset it to initial one
  act(() => reset());
  expect(result.current[0]).toBe(5);
});

it("should reset and set new original value", () => {
  const { result } = setUp(5);
  const { set, reset } = result.current[1];

  // set different value than initial one...
  act(() => set(17));
  expect(result.current[0]).toBe(17);

  // ... now reset and set it to different than initial one...
  act(() => reset(8));
  expect(result.current[0]).toBe(8);

  // ... and set different value than initial one again...
  act(() => set(32));
  expect(result.current[0]).toBe(32);

  // ... and reset it to new initial value
  act(() => reset());
  expect(result.current[0]).toBe(8);
});

it("should not exceed max value", () => {
  expect(() => {
    setUp(10, 5);
  }).toThrowError("Your starting value of 10 is greater than your max of 5.");

  const { result } = setUp(10, 10, 0);
  const { increment, reset } = result.current[1];

  act(() => reset(20));
  expect(result.current[0]).toBe(10);

  act(() => reset(10));
  expect(result.current[0]).toBe(10);

  act(() => increment());
  expect(result.current[0]).toBe(10);
});

it("should not exceed min value", () => {
  expect(() => {
    setUp(3, null, 5);
  }).toThrowError("Your starting value of 3 is less than your min of 5.");

  const { result } = setUp(10, 10, 0);
  const { decrement, reset } = result.current[1];

  act(() => reset(-10));
  expect(result.current[0]).toBe(0);

  act(() => reset(0));
  expect(result.current[0]).toBe(0);

  act(() => decrement());
  expect(result.current[0]).toBe(0);
});

describe("should `console.error` on unexpected inputs", () => {
  it("if the min is greater than than the max", () => {
    const spy = spyOn(console, "error").mockImplementation(() => {});

    expect(() => {
      setUp(10, 3, 5);
    }).toThrowError(`Your min of 5 is greater than your max of 3.`);

    spy.mockRestore();
  });
});
