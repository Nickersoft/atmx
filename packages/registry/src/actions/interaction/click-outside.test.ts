import {
  expect,
  describe,
  vi,
  beforeAll,
  afterAll,
  afterEach,
  it,
} from "vitest";

import { clickOutside } from "./click-outside.ts";

describe("clickOutside", function () {
  let element: HTMLElement;
  let sibling: HTMLElement;
  let action: ReturnType<typeof clickOutside>;

  beforeAll(function () {
    element = document.createElement("div");
    sibling = document.createElement("div");
    document.body.appendChild(element);
    document.body.appendChild(sibling);
  });

  afterAll(function () {
    element.remove();
    sibling.remove();
  });

  afterEach(function () {
    action?.destroy!();
  });

  it("calls callback on outside click", function () {
    const cb = vi.fn();
    action = clickOutside(element, { enabled: true, cb });
    sibling.click();
    expect(cb).toHaveBeenCalledTimes(1);
  });

  it("does not call callback when disabled", function () {
    const cb = vi.fn();
    action = clickOutside(element, { enabled: false, cb });
    sibling.click();
    expect(cb).not.toHaveBeenCalled();
  });

  it("does not call callback when element clicked", function () {
    const cb = vi.fn();
    action = clickOutside(element, { enabled: true, cb });
    element.click();
    expect(cb).not.toHaveBeenCalled();
  });

  it("updates parameters", function () {
    const cb = vi.fn();
    action = clickOutside(element, { enabled: true, cb });
    action?.update?.({ enabled: false, cb });
    sibling.click();
    expect(cb).not.toHaveBeenCalled();
  });
});
