import type { AnchorHTMLAttributes } from "react";

import { Typography } from "./typography";
import { cn } from "@/lib/utils";

interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {}

export function Link({ className, children, ...props }: LinkProps) {
  return (
    <Typography
      color="muted"
      className={cn("hover:text-foreground text-sm font-light", className)}
      asChild
    >
      <a {...props}>{children}</a>
    </Typography>
  );
}
