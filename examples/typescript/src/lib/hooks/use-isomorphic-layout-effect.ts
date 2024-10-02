import * as React from "react";

import { isBrowser } from "@/lib/helpers/is-browser.js";

export const useIsomorphicLayoutEffect = isBrowser()
  ? React.useLayoutEffect
  : React.useEffect;
