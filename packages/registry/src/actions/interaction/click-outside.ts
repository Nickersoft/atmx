import type { Action } from "svelte/action";

export interface ClickOutsideConfig {
  enabled: boolean;
  cb: (node: HTMLElement) => void;
}
/**
 * Call callback when user clicks outside a given element
 *
 * @example
 * ```svelte
 * <div use:clickOutside={{ enabled: open, cb: () => open = false }} />
 * ```
 */
export const clickOutside: Action<HTMLElement, ClickOutsideConfig> = (
  node,
  config,
) => {
  function handler(e: MouseEvent) {
    if (!node.contains(e.target as Node)) {
      config.cb(node);
    }
  }

  function setHandler(enabled: boolean) {
    if (enabled) {
      window.addEventListener("click", handler);
    } else {
      window.removeEventListener("click", handler);
    }
  }

  setHandler(config.enabled);

  return {
    update(params) {
      config = params;
      setHandler(config.enabled);
    },
    destroy() {
      setHandler(false);
    },
  };
};
