import * as React from "react";

/**
 * Returns a boolean indicating if the current browser window matches the given media query.
 *
 * @param query - The media query to match.
 *
 * @example
 * ```tsx
 * const App = () => {
 *  const isMobile = useMediaQuery("(max-width: 768px)");
 *  return <div>{isMobile ? "Mobile" : "Desktop"}</div>;
 * };
 */
export function useMediaQuery(query: string): boolean {
  const mediaQueryList = React.useMemo(() => window.matchMedia(query), [query]);

  const [matches, setMatches] = React.useState(mediaQueryList.matches);

  React.useEffect(() => {
    const listener = () => setMatches(mediaQueryList.matches);
    mediaQueryList.addEventListener("change", listener);
    return () => mediaQueryList.removeEventListener("change", listener);
  }, [mediaQueryList]);

  return matches;
}
