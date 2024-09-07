import type { Action } from "svelte/action";

/**
 * Creates `longpress` event when mousedown above `duration` milliseconds.
 *
 * @example
 * ```svelte
 * <button use:longpress={duration} on:longpress={() => alert("longpress")}>
 * press and hold
 * </button>
 * ```
 */
export const longpress: Action<HTMLElement, number> = (node, duration) => {
  let timer: number;

  function handleMouseDown() {
    timer = window.setTimeout(() => {
      node.dispatchEvent(new CustomEvent("longpress"));
    }, duration);
  }

  function handleMouseUp() {
    clearTimeout(timer);
  }

  node.addEventListener("mousedown", handleMouseDown);
  node.addEventListener("mouseup", handleMouseUp);

  return {
    update(newDuration) {
      handleMouseUp();
      duration = newDuration;
    },
    destroy() {
      handleMouseUp();
      node.removeEventListener("mousedown", handleMouseDown);
      node.removeEventListener("mouseup", handleMouseUp);
    },
  };
};
