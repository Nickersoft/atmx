import {
  describe,
  beforeAll,
  vi,
  beforeEach,
  afterEach,
  it,
  expect,
} from "vitest";

// Needed for r e a s o n s
// https://github.com/vitest-dev/vitest/issues/6104
import { spyOn, type SpyImpl } from "tinyspy";

import { lazyload } from "./lazyload.js";

describe("lazyload", function () {
  let element: HTMLElement;
  let action: ReturnType<typeof lazyload>;
  let intersectionObserverConstructorSpy: SpyImpl;

  const observeFake = vi.fn();
  const unobserveFake = vi.fn();

  beforeAll(function () {
    setupIntersectionObserverMock({
      observe: observeFake,
      unobserve: unobserveFake,
    });

    intersectionObserverConstructorSpy = spyOn(window, "IntersectionObserver");
  });

  beforeEach(function () {
    element = document.createElement("div");
    document.body.appendChild(element);
  });

  afterEach(function () {
    action?.destroy!();
    element.remove();

    observeFake.mockClear();
    unobserveFake.mockClear();
  });

  it("observes node", function () {
    action = lazyload(element, {});
    expect(intersectionObserverConstructorSpy.callCount).toBe(1);
    expect(observeFake).toHaveBeenCalledOnce();
  });

  it("sets attribute on intersection", function () {
    action = lazyload(element, { className: "test" });

    const intersectionCallback = intersectionObserverConstructorSpy.calls[0][0];

    intersectionCallback([{ isIntersecting: true, target: element }]);

    expect(unobserveFake).toHaveBeenCalledOnce();
    expect(element.className).toBe("test");
  });

  it("does not set attribute when no intersection", function () {
    action = lazyload(element, { className: "test" });

    const intersectionCallback = intersectionObserverConstructorSpy.calls[0][0];

    intersectionCallback([{ isIntersecting: false, target: element }]);

    expect(unobserveFake).not.toHaveBeenCalled();
    expect(element.className).toBe("");
  });
});

// from https://stackoverflow.com/a/58651649
function setupIntersectionObserverMock({
  root = null,
  rootMargin = "",
  thresholds = [],
  disconnect = () => null,
  observe = () => null,
  takeRecords = () => [],
  unobserve = () => null,
} = {}): void {
  class MockIntersectionObserver implements IntersectionObserver {
    readonly root: Element | null = root;
    readonly rootMargin: string = rootMargin;
    readonly thresholds: ReadonlyArray<number> = thresholds;

    constructor() {
      this.root = null;
      this.rootMargin = "";
      this.thresholds = [];
    }

    disconnect() {
      return disconnect();
    }

    observe() {
      return observe();
    }

    takeRecords(): IntersectionObserverEntry[] {
      return takeRecords();
    }

    unobserve() {
      return unobserve();
    }
  }

  window.IntersectionObserver = MockIntersectionObserver;
}
