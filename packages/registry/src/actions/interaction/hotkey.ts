import type { Action } from "svelte/action";

export interface HotkeyConfig {
  /**
   * Should the event be active or not.
   * Allows to remove listener when not necessary.
   */
  active?: boolean;
  alt?: boolean;
  /**
   * The callback to be called when the shortcut is triggered.
   */
  callback?: (node: HTMLElement) => void;
  /**
   * The code of the key to listen for.
   * {@link https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/code}
   */
  code: KeyboardEventInit["code"];
  control?: boolean;
  shift?: boolean;
}

/**
 * Adds a keyboard shortcut to an element.
 * It either calls a callback or clicks the node it was added to if one is not provided.
 *
 * @example
 * ```svelte
 * <div use:hotkey={{ code: 'KeyA', callback: () => alert('A') }} />
 * ```
 */
export const hotkey: Action<HTMLElement, HotkeyConfig> = (node, config) => {
  const validate = (event: KeyboardEvent) => {
    const { alt = false, code, control = false, shift = false } = config;

    return [
      code === event.code,
      alt === event.altKey,
      control == event.ctrlKey || control === event.metaKey,
      shift === event.shiftKey,
    ].every(Boolean);
  };

  const handleKeyboard = (event: KeyboardEvent) => {
    const { callback = (node: HTMLElement) => node.click() } = config;

    if (!validate(event)) {
      return;
    }

    event.preventDefault();
    callback(node);
  };

  const activate = () => {
    window.addEventListener("keydown", handleKeyboard);
  };

  const deactivate = () => {
    window.removeEventListener("keydown", handleKeyboard);
  };

  const init = () => {
    const { active = true } = config;
    active ? activate() : deactivate();
  };

  init();

  return {
    update(updatedConfig) {
      config = updatedConfig;
      init();
    },
    destroy() {
      deactivate();
    },
  };
};
