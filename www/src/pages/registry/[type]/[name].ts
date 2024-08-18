import type { APIRoute } from "astro";

import {
  type SnippetMetadata,
  getSnippetMetadata,
  createSnippets,
  ts2js,
} from "registry-tools";

export const GET: APIRoute<{ snippet: SnippetMetadata }> = async ({
  params,
  props,
}) => {
  const { name } = params;
  const { snippet } = props;

  if (name?.endsWith(".ts")) {
    return new Response(snippet.content);
  }

  if (name?.endsWith(".js")) {
    return new Response(await ts2js(snippet.content));
  }

  return new Response(JSON.stringify(snippet));
};

export async function getStaticPaths() {
  const snippets = await createSnippets(
    await import.meta.glob("../../snippets/**/*.ts", { query: "raw" }),
  );

  return Promise.all(
    Object.entries(snippets).flatMap(([type, snippets]) =>
      Promise.all(
        snippets?.map(async (snippet) => {
          const metadata = await getSnippetMetadata(snippet);
          return [
            {
              params: { type, name: `${snippet.name}.json` },
              props: { snippet: metadata },
            },
            {
              params: { type, name: `${snippet.name}.ts` },
              props: { snippet: metadata },
            },
            {
              params: { type, name: `${snippet.name}.js` },
              props: { snippet: metadata },
            },
          ];
        }) ?? [],
      ),
    ),
  ).then((paths) => paths.flat(Infinity));
}
