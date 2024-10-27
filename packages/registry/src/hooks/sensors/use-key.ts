import { type DependencyList, useEffect, useMemo } from "react";

export type KeyPredicate = (event: KeyboardEvent) => boolean;

export type KeyFilter =
  | null
  | undefined
  | string
  | ((event: KeyboardEvent) => boolean);

export type Handler = (event: KeyboardEvent) => void;

export interface UseKeyOptions<T extends EventTarget> {
  event?: "keydown" | "keypress" | "keyup";
  target?: T | null;
  options?: boolean | AddEventListenerOptions;
}

function createKeyPredicate(keyFilter: KeyFilter): KeyPredicate {
  if (typeof keyFilter === "function") {
    return keyFilter;
  }

  if (typeof keyFilter === "string") {
    return (event: KeyboardEvent) => event.key === keyFilter;
  }

  return () => !!keyFilter;
}

/**
 * Listens for a specific key event.
 *
 * @param key - The key to listen for.
 * @param fn - The function to call when the key is pressed.
 * @param opts - The options for the key event.
 * @param deps - The dependencies for the key event.
 * @returns A function to remove the event listener.
 */
const useKey = <T extends Node>(
  key: KeyFilter,
  fn: Handler = () => {},
  opts?: UseKeyOptions<T>,
  deps: DependencyList = [key],
) => {
  const { event = "keydown", target = document, options = {} } = opts ?? {};

  const useMemoHandler = useMemo(() => {
    const predicate: KeyPredicate = createKeyPredicate(key);

    const handler: Handler = (handlerEvent) => {
      if (predicate(handlerEvent)) {
        return fn(handlerEvent);
      }
    };

    return handler;
  }, deps) as EventListenerOrEventListenerObject;

  useEffect(() => {
    target?.addEventListener(event, useMemoHandler, options);

    return () => {
      target?.removeEventListener(event, useMemoHandler, options);
    };
  }, [event, target, options, useMemoHandler]);
};

export default useKey;
