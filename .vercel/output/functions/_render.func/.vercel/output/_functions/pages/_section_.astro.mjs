import { c as createComponent, b as createAstro } from '../chunks/astro/server_BGlMLyqa.mjs';
import 'clsx';
import { g as getSnippets } from '../chunks/snippets_CyvlgTyp.mjs';
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro();
const prerender = false;
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  const snippets = await getSnippets();
  const firstFunc = snippets?.[Astro2.params.section]?.[0]?.snippets?.[0];
  return Astro2.redirect(`/${Astro2.params.section}/${firstFunc?.name}`);
}, "/Users/tjnickerson/Documents/GitHub/Nickersoft/code-snippets/src/pages/[section]/index.astro", void 0);

const $$file = "/Users/tjnickerson/Documents/GitHub/Nickersoft/code-snippets/src/pages/[section]/index.astro";
const $$url = "/[section]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Index,
	file: $$file,
	prerender,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
