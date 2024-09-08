import {
  describe,
  jest,
  beforeAll,
  afterEach,
  it,
  afterAll,
  expect,
} from "bun:test";

import { pannable } from "./pannable.ts";

describe("pannable", function () {
  let element: HTMLElement;
  let action: ReturnType<typeof pannable>;

  beforeAll(function () {
    element = document.createElement("div");
    document.body.appendChild(element);
  });

  afterAll(function () {
    element.remove();
  });

  afterEach(function () {
    action?.destroy!();
  });

  it("dispatches pan events", function () {
    action = pannable(element);

    const panstartCb = jest.fn();
    const panmoveCb = jest.fn();
    const panendCb = jest.fn();

    element.addEventListener("panstart", panstartCb);
    element.addEventListener("panmove", panmoveCb);
    element.addEventListener("panend", panendCb);

    element.dispatchEvent(
      new window.MouseEvent("mousedown", { clientX: 20, clientY: 30 }),
    );

    const panstartDetail = panstartCb.mock.calls[0][0].detail;

    expect(panstartDetail).toStrictEqual({ x: 20, y: 30 });

    window.dispatchEvent(
      new window.MouseEvent("mousemove", { clientX: 30, clientY: 50 }),
    );

    const panmoveDetail = panmoveCb.mock.calls[0][0].detail;

    expect(panmoveDetail).toStrictEqual({ x: 30, y: 50, dx: 10, dy: 20 });

    window.dispatchEvent(
      new window.MouseEvent("mouseup", { clientX: 35, clientY: 55 }),
    );

    const panendDetail = panendCb.mock.calls[0][0].detail;

    expect(panendDetail).toStrictEqual({ x: 35, y: 55 });
  });
});
