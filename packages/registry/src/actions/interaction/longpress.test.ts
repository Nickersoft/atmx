import {
  describe,
  vi,
  beforeAll,
  afterEach,
  it,
  afterAll,
  type VitestUtils,
  expect,
} from "vitest";

import { longpress } from "./longpress.js";

describe("longpress", function () {
  let element: HTMLElement;
  let cb = vi.fn();
  let action: ReturnType<typeof longpress>;
  let clock: VitestUtils;

  beforeAll(function () {
    element = document.createElement("div");
    element.addEventListener("longpress", cb);
    document.body.appendChild(element);
    clock = vi.useFakeTimers();
  });

  afterAll(() => {
    element.remove();
    clock.restoreAllMocks();
  });

  afterEach(() => {
    action?.destroy!();
    cb.mockClear();
  });

  it("dispatches longpress event when mousedown more than duration", function () {
    const duration = 10;
    action = longpress(element, duration);
    element.dispatchEvent(new window.MouseEvent("mousedown"));
    clock.advanceTimersByTime(duration);
    element.dispatchEvent(new window.MouseEvent("mouseup"));
    expect(cb).toHaveBeenCalledOnce();
  });

  it("does not dispatch longpress event when mousedown less than duration", function () {
    action = longpress(element, 100);
    element.dispatchEvent(new window.MouseEvent("mousedown"));
    clock.advanceTimersByTime(10);
    element.dispatchEvent(new window.MouseEvent("mouseup"));
    expect(cb).not.toHaveBeenCalled();
  });

  it("updates duration", function () {
    const newDuration = 10;
    action = longpress(element, 500);
    action?.update?.(newDuration);
    element.dispatchEvent(new window.MouseEvent("mousedown"));
    clock.advanceTimersByTime(newDuration);
    element.dispatchEvent(new window.MouseEvent("mouseup"));
    expect(cb).toHaveBeenCalledOnce();
  });
});
