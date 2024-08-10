import { cn } from "@/lib/utils";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import type { HTMLAttributes } from "react";

type TypographyTag =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "p"
  | "span"
  | "li"
  | "div";

export const typographyVariants = cva("font-sans font-normal", {
  variants: {
    variant: {
      h1: "scroll-m-20 text-4xl font-bold tracking-tight",
      h2: "scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0",
      h3: "scroll-m-20 text-2xl font-semibold tracking-tight",
      h4: "scroll-m-20 text-xl font-semibold tracking-tight",
      h5: "scroll-m-20 text-lg font-semibold tracking-tight",
      h6: "scroll-m-20 text-base font-semibold tracking-tight",
      p: "leading-7 [&:not(:first-of-type)]:mt-6",
    },
    color: {
      default: "",
      muted: "text-muted-foreground",
    },
  },
  defaultVariants: {
    variant: "p",
    color: "default",
  },
});

interface TypographyProps
  extends Omit<HTMLAttributes<HTMLElement>, "color">,
    VariantProps<typeof typographyVariants> {
  asChild?: boolean;
}

const tagMap: Partial<
  Record<
    Exclude<TypographyProps["variant"], null | typeof undefined>,
    TypographyTag
  >
> = {
  h1: "h1",
  // subtitle: "p",
  // headline: "h2",
  // title: "h3",
  // body: "p",
};

export function Typography(props: TypographyProps) {
  const { asChild, children, className, variant, color, ...rest } = props;

  const Tag = asChild ? Slot : (tagMap[variant ?? "p"] ?? "p");

  return (
    <Tag
      {...rest}
      className={cn(
        typographyVariants({
          variant,
          color,
          className,
        }),
      )}
    >
      {children}
    </Tag>
  );
}
