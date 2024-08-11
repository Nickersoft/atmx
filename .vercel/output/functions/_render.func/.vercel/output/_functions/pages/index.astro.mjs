import { c as createComponent, b as createAstro } from '../chunks/astro/server_BGlMLyqa.mjs';
import 'clsx';
import '../chunks/BaseLayout_CQHNky8q.mjs';
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro();
const prerender = false;
const $$Index = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  return Astro2.redirect("/helpers");
}, "/Users/tjnickerson/Documents/GitHub/Nickersoft/code-snippets/src/pages/index.astro", void 0);

const $$file = "/Users/tjnickerson/Documents/GitHub/Nickersoft/code-snippets/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
