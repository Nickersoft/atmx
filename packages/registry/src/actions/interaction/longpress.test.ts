import {
  describe,
  beforeAll,
  afterEach,
  jest,
  it,
  afterAll,
  expect,
} from "bun:test";

import { install, type InstalledClock } from "@sinonjs/fake-timers";

import { longpress } from "./longpress.ts";

describe("longpress", function () {
  let element: HTMLElement;
  let cb = jest.fn();
  let action: ReturnType<typeof longpress>;
  let clock: InstalledClock;

  beforeAll(function () {
    element = document.createElement("div");
    element.addEventListener("longpress", cb);
    document.body.appendChild(element);
    clock = install();
  });

  afterAll(() => {
    element.remove();
    clock.uninstall();
  });

  afterEach(() => {
    action?.destroy!();
    cb.mockClear();
  });

  it("dispatches longpress event when mousedown more than duration", function () {
    const duration = 10;
    action = longpress(element, duration);
    element.dispatchEvent(new window.MouseEvent("mousedown"));
    clock.tick(duration);
    element.dispatchEvent(new window.MouseEvent("mouseup"));
    expect(cb).toHaveBeenCalledTimes(1);
  });

  it("does not dispatch longpress event when mousedown less than duration", function () {
    action = longpress(element, 100);
    element.dispatchEvent(new window.MouseEvent("mousedown"));
    clock.tick(10);
    element.dispatchEvent(new window.MouseEvent("mouseup"));
    expect(cb).not.toHaveBeenCalled();
  });

  it("updates duration", function () {
    const newDuration = 10;
    action = longpress(element, 500);
    action?.update?.(newDuration);
    element.dispatchEvent(new window.MouseEvent("mousedown"));
    clock.tick(newDuration);
    element.dispatchEvent(new window.MouseEvent("mouseup"));
    expect(cb).toHaveBeenCalledTimes(1);
  });
});
