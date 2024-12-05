import * as React from "react";

import { isBrowser } from "@/helpers/browser/is-browser.ts";

/**
 * A hook that uses `useLayoutEffect` on the client and `useEffect` on the server.
 */
export const useIsomorphicLayoutEffect = isBrowser()
  ? React.useLayoutEffect
  : React.useEffect;
