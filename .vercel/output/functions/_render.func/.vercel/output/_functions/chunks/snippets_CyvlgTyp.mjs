import 'core-js/features/object/group-by.js';

async function getSnippets() {
  const files = await /* #__PURE__ */ Object.assign({"../snippets/helpers/array/alphabetical.ts": () => import('./alphabetical_Bb_HRBBW.mjs'),"../snippets/helpers/array/group.ts": () => import('./group_BWwdGnBB.mjs'),"../snippets/helpers/array/objectify.ts": () => import('./objectify_Cs2eg3Mv.mjs'),"../snippets/helpers/object/flatten.ts": () => import('./flatten_DsE8hj0n.mjs'),"../snippets/helpers/object/get.ts": () => import('./get_B0eL8l9P.mjs'),"../snippets/helpers/object/keys.ts": () => import('./keys_D4JMnev5.mjs'),"../snippets/helpers/string/capitalize.ts": () => import('./capitalize_BJzfQ9tH.mjs'),"../snippets/helpers/typed/is-array.ts": () => import('./is-array_B2zZXjVG.mjs')

});
  const objs = await Promise.all(
    Object.entries(files).map(async ([path, content]) => {
      const [, , section, category, name] = path.split("/");
      return {
        section,
        category,
        name: name.replace(".ts", ""),
        content: content()
      };
    })
  );
  return Object.fromEntries(
    Object.entries(Object.groupBy(objs, (x) => x.section)).map(
      ([section, value]) => [
        section,
        Object.entries(Object.groupBy(value ?? [], (x) => x.category)).map(
          ([category, snippets]) => ({
            section,
            category,
            snippets: snippets.map((x) => ({
              name: x.name,
              content: x.content
            }))
          })
        )
      ]
    )
  );
}
function transformCode(code) {
  return code.replaceAll(/snippets\/(.+?)\/.+?\/(.+?)/g, "helpers/$2");
}

export { getSnippets as g, transformCode as t };
