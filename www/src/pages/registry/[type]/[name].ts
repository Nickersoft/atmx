import type { APIRoute } from "astro";

import {
  type ExpandedSnippet,
  type SnippetType,
  getRegistryName,
} from "@atmx-org/common";

import { transformToJS, getDocsForSnippet } from "@atmx-org/registry-tools";

import { createRegistry } from "@/lib/create-registry";

export const GET: APIRoute<{ snippet: ExpandedSnippet }> = async ({
  params,
  props,
}) => {
  const { name } = params;
  const { snippet } = props;

  if (name?.endsWith(".ts")) {
    return new Response(snippet.content);
  }

  if (name?.endsWith(".js")) {
    return new Response(await transformToJS(snippet.content));
  }

  return new Response(JSON.stringify(snippet));
};

export async function getStaticPaths() {
  const snippets = await createRegistry();

  return Promise.all(
    Object.entries(snippets).flatMap(([_type, snippets]) =>
      Promise.all(
        snippets?.map(async (snippet) => {
          const metadata = await getDocsForSnippet(snippet).then((docs) => ({
            ...snippet,
            ...docs,
          }));

          const type = getRegistryName(_type as SnippetType);

          return [
            {
              params: { type, name: `${snippet.id}.json` },
              props: { snippet: metadata },
            },
            {
              params: { type, name: `${snippet.id}.ts` },
              props: { snippet: metadata },
            },
            {
              params: { type, name: `${snippet.id}.js` },
              props: { snippet: metadata },
            },
          ];
        }) ?? [],
      ),
    ),
  ).then((paths) => paths.flat(Infinity));
}
