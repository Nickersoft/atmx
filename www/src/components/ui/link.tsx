import type { AnchorHTMLAttributes } from "react";

import { Typography } from "./typography";
import { cn } from "www/src/lib/utils";

interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {}

export function Link({ className, children, ...props }: LinkProps) {
  return (
    <Typography
      color="muted"
      className={cn(
        "text-sm font-light transition-all duration-150 hover:text-foreground active:opacity-50",
        className,
      )}
      asChild
    >
      <a {...props}>{children}</a>
    </Typography>
  );
}
