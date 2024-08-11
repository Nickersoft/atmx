import { c as createComponent, r as renderTemplate, a as addAttribute, b as createAstro, m as maybeRenderHead, e as renderComponent, f as renderTransition, g as renderHead, h as renderSlot } from './astro/server_BGlMLyqa.mjs';
import { clsx } from 'clsx';
/* empty css                          */
import { twMerge } from 'tailwind-merge';
import { jsx, jsxs } from 'react/jsx-runtime';
import { Slot } from '@radix-ui/react-slot';
import { cva } from 'class-variance-authority';
import { g as getSnippets } from './snippets_CyvlgTyp.mjs';
import * as React from 'react';
import * as ScrollAreaPrimitive from '@radix-ui/react-scroll-area';

const $$Astro$3 = createAstro();
const $$ViewTransitions = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$ViewTransitions;
  const { fallback = "animate" } = Astro2.props;
  return renderTemplate`<meta name="astro-view-transitions-enabled" content="true"><meta name="astro-view-transitions-fallback"${addAttribute(fallback, "content")}>`;
}, "/Users/tjnickerson/Documents/GitHub/Nickersoft/code-snippets/node_modules/.pnpm/astro@4.13.3_typescript@5.5.4/node_modules/astro/components/ViewTransitions.astro", void 0);

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const typographyVariants = cva("font-sans tracking-normal font-normal", {
  variants: {
    variant: {
      h1: "scroll-m-20 text-4xl font-bold tracking-tight",
      h2: "scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0",
      h3: "scroll-m-20 text-2xl font-semibold tracking-tight",
      h4: "scroll-m-20 text-xl font-semibold tracking-tight",
      h5: "scroll-m-20 text-lg font-semibold tracking-tight",
      h6: "scroll-m-20 text-base font-semibold tracking-normal",
      p: "leading-7 [&:not(:first-of-type)]:mt-6"
    },
    color: {
      default: "",
      muted: "text-muted-foreground"
    }
  },
  defaultVariants: {
    variant: "p",
    color: "default"
  }
});
const tagMap = {
  h1: "h1"
  // subtitle: "p",
  // headline: "h2",
  // title: "h3",
  // body: "p",
};
function Typography(props) {
  const { asChild, children, className, variant, color, ...rest } = props;
  const Tag = asChild ? Slot : tagMap[variant ?? "p"] ?? "p";
  return /* @__PURE__ */ jsx(
    Tag,
    {
      ...rest,
      className: cn(
        typographyVariants({
          variant,
          color,
          className
        })
      ),
      children
    }
  );
}

function Link({ className, children, ...props }) {
  return /* @__PURE__ */ jsx(
    Typography,
    {
      color: "muted",
      className: cn(
        "text-sm font-light transition-all duration-150 hover:text-foreground active:opacity-50",
        className
      ),
      asChild: true,
      children: /* @__PURE__ */ jsx("a", { ...props, children })
    }
  );
}

const $$Astro$2 = createAstro();
const $$Nav = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$Nav;
  const items = ["helpers", "hooks"];
  return renderTemplate`${maybeRenderHead()}<nav class="border-b"> <ul class="flex flex-row justify-left items-center gap-4 p-4"> ${items.map((section) => {
    const active = Astro2.url.pathname.startsWith(`/${section}`);
    return renderTemplate`<li> ${renderComponent($$result, "Link", Link, { "className": cn(
      "rounded-full font-medium capitalize",
      "hover:text-foreground",
      active && "text-foreground px-2 py-1"
    ), "href": `/${section}` }, { "default": ($$result2) => renderTemplate`${section}` })} </li>`;
  })} </ul> </nav>`;
}, "/Users/tjnickerson/Documents/GitHub/Nickersoft/code-snippets/src/components/Nav.astro", void 0);

const ScrollArea = React.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxs(
  ScrollAreaPrimitive.Root,
  {
    ref,
    className: cn("relative overflow-hidden", className),
    ...props,
    children: [
      /* @__PURE__ */ jsx(ScrollAreaPrimitive.Viewport, { className: "h-full w-full rounded-[inherit]", children }),
      /* @__PURE__ */ jsx(ScrollBar, {}),
      /* @__PURE__ */ jsx(ScrollAreaPrimitive.Corner, {})
    ]
  }
));
ScrollArea.displayName = ScrollAreaPrimitive.Root.displayName;
const ScrollBar = React.forwardRef(({ className, orientation = "vertical", ...props }, ref) => /* @__PURE__ */ jsx(
  ScrollAreaPrimitive.ScrollAreaScrollbar,
  {
    ref,
    orientation,
    className: cn(
      "flex touch-none select-none transition-colors",
      orientation === "vertical" && "h-full w-2.5 border-l border-l-transparent p-[1px]",
      orientation === "horizontal" && "h-2.5 flex-col border-t border-t-transparent p-[1px]",
      className
    ),
    ...props,
    children: /* @__PURE__ */ jsx(ScrollAreaPrimitive.ScrollAreaThumb, { className: "relative flex-1 rounded-full bg-border" })
  }
));
ScrollBar.displayName = ScrollAreaPrimitive.ScrollAreaScrollbar.displayName;

const $$Astro$1 = createAstro();
const $$Sidebar = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Sidebar;
  const snippets = await getSnippets();
  const section = Astro2.params.section;
  return renderTemplate`${maybeRenderHead()}<aside class="h-full border-r py-4"> ${renderComponent($$result, "ScrollArea", ScrollArea, { "client:load": true, "client:component-hydration": "load", "client:component-path": "@/components/ui/scroll-area", "client:component-export": "ScrollArea" }, { "default": ($$result2) => renderTemplate`${snippets[section]?.map(({ category, snippets: snippets2 }) => renderTemplate`<section class="w-full mb-4 px-2"> ${renderComponent($$result2, "Typography", Typography, { "className": "text-sm select-none pointer-events-none capitalize mb-2 ml-2", "variant": "h6" }, { "default": ($$result3) => renderTemplate`${category}` })} <ul> ${snippets2.map(({ name }) => renderTemplate`<li class="w-full"${addAttribute(renderTransition($$result2, "gf5uvitl", "none"), "data-astro-transition-scope")}> ${renderComponent($$result2, "Link", Link, { "className": cn(
    "w-full inline-block rounded-md border-transparent border p-2",
    Astro2.params.name === name && "bg-muted text-foreground"
  ), "href": `/${section}/${name}` }, { "default": ($$result3) => renderTemplate`${name}` })} </li>`)} </ul> </section>`)}` })} </aside>`;
}, "/Users/tjnickerson/Documents/GitHub/Nickersoft/code-snippets/src/components/Sidebar.astro", "self");

const $$Astro = createAstro();
const $$BaseLayout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$BaseLayout;
  const fly = {
    old: {
      name: "flyOut",
      duration: "0.1s",
      easing: "ease-out",
      fillMode: "forwards"
    },
    new: {
      name: "flyIn",
      duration: "0.3s",
      easing: "ease-in-out",
      fillMode: "backwards"
    }
  };
  return renderTemplate`<html lang="en" class="w-full h-full dark"${addAttribute(renderTransition($$result, "mo47iqwu", "none"), "data-astro-transition-scope")}> <head><meta charset="utf-8"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><meta name="viewport" content="width=device-width"><meta name="generator"${addAttribute(Astro2.generator, "content")}><title>Astro</title>${renderComponent($$result, "ViewTransitions", $$ViewTransitions, {})}${renderHead()}</head> <body class="w-full flex flex-col h-full"> ${renderComponent($$result, "Nav", $$Nav, {})} <div class="grid h-full grid-cols-[275px,auto]"> ${renderComponent($$result, "Sidebar", $$Sidebar, {})} <main class="p-8"> <div${addAttribute(renderTransition($$result, "yjsph43v", { forwards: fly, backwards: fly }), "data-astro-transition-scope")}> ${renderComponent($$result, "ScrollArea", ScrollArea, { "className": "max-w-3xl" }, { "default": ($$result2) => renderTemplate` ${renderSlot($$result2, $$slots["default"])} ` })} </div> </main> </div> </body></html>`;
}, "/Users/tjnickerson/Documents/GitHub/Nickersoft/code-snippets/src/layouts/BaseLayout.astro", "self");

export { $$BaseLayout as $, Typography as T, cn as c };
