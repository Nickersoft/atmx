import {
  expect,
  describe,
  beforeAll,
  vi,
  afterAll,
  afterEach,
  it,
} from "vitest";

import { hotkey } from "./hotkey.js";

describe("hotkey", function () {
  let element: HTMLElement;
  let action: ReturnType<typeof hotkey>;

  const spaceKeyCode = "Space";

  beforeAll(function () {
    element = document.createElement("div");
    document.body.appendChild(element);
  });

  afterAll(function () {
    element.remove();
  });

  afterEach(function () {
    action?.destroy?.();
  });

  it("calls callback when callback provided", function () {
    const callback = vi.fn();
    action = hotkey(element, { code: spaceKeyCode, callback });
    dispatchKeydownEvent({ code: spaceKeyCode });
    expect(callback).toHaveBeenCalledOnce();
  });

  it("clicks node when callback not provided", function () {
    const callback = vi.fn();
    action = hotkey(element, { code: spaceKeyCode });
    element.addEventListener("click", callback);
    dispatchKeydownEvent({ code: spaceKeyCode });
    expect(callback).toHaveBeenCalledOnce();
    element.removeEventListener("click", callback);
  });

  it("does not call callback when different key pressed", function () {
    const callback = vi.fn();
    action = hotkey(element, { code: spaceKeyCode, callback });
    dispatchKeydownEvent({ code: "KeyA" });
    expect(callback).not.toHaveBeenCalled();
  });

  it("handles alt key", function () {
    const callback = vi.fn();
    action = hotkey(element, { code: spaceKeyCode, callback, alt: true });
    dispatchKeydownEvent({ code: spaceKeyCode, altKey: true });
    expect(callback).toHaveBeenCalledOnce();
  });

  it("handles shift key", function () {
    const callback = vi.fn();
    action = hotkey(element, { code: spaceKeyCode, callback, shift: true });
    dispatchKeydownEvent({ code: spaceKeyCode, shiftKey: true });
    expect(callback).toHaveBeenCalledOnce();
  });

  it("handles ctrl and meta key", function () {
    const callback = vi.fn();
    action = hotkey(element, { code: spaceKeyCode, callback, control: true });
    dispatchKeydownEvent({ code: spaceKeyCode, ctrlKey: true });
    dispatchKeydownEvent({ code: spaceKeyCode, metaKey: true });
    expect(callback).toHaveBeenCalledTimes(2);
  });

  it("updates key code", function () {
    const callback = vi.fn();
    action = hotkey(element, { code: spaceKeyCode, callback });
    action?.update?.({ code: "KeyA", callback });
    dispatchKeydownEvent({ code: "KeyA" });
    dispatchKeydownEvent({ code: spaceKeyCode });
    expect(callback).toHaveBeenCalledOnce();
  });

  it("does not fire callback when it is inactive", function () {
    const callback = vi.fn();
    action = hotkey(element, { code: spaceKeyCode, callback });
    dispatchKeydownEvent({ code: spaceKeyCode });
    action?.update?.({ active: false, code: spaceKeyCode, callback });
    dispatchKeydownEvent({ code: spaceKeyCode });
    action?.update?.({ code: spaceKeyCode, callback });
    dispatchKeydownEvent({ code: spaceKeyCode });
    expect(callback).toHaveBeenCalledTimes(2);
  });
});

function dispatchKeydownEvent(eventInitDict: KeyboardEventInit) {
  window.dispatchEvent(new window.KeyboardEvent("keydown", eventInitDict));
}
