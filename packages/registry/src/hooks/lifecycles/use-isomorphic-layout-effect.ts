import * as React from "react";

import { isBrowser } from "@/helpers/browser/is-browser.ts";

export const useIsomorphicLayoutEffect = isBrowser()
  ? React.useLayoutEffect
  : React.useEffect;
