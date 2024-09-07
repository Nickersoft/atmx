import type { Action } from "svelte/action";

/**
 * Set attributes on an element when it is visible in the viewport.
 *
 * @example
 * ```svelte
 * <img use:lazyLoad={{src:"/myimage"}} alt="">
 * ```
 */
export const lazyload = ((): Action<HTMLElement, object> => {
  const attributeMap = new WeakMap<HTMLElement, object>();

  let observer: IntersectionObserver;

  return (node, attributes) => {
    attributeMap.set(node, attributes);

    observer ??= new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && entry.target instanceof HTMLElement) {
          const node = entry.target;

          Object.assign(node, attributeMap.get(node));

          observer.unobserve(node);
        }
      });
    });

    observer.observe(node);

    return {
      destroy() {
        observer.unobserve(node);
      },
    };
  };
})();
