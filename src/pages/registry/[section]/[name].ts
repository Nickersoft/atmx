import type { APIRoute } from "astro";

import { getSnippetMetadata, getSnippets } from "@/lib/snippets";
import type { SnippetMetadata } from "@/types";

export const GET: APIRoute<{ snippet: SnippetMetadata }> = async ({
  params,
  props,
}) => {
  const { name } = params;
  const { snippet } = props;

  if (name?.endsWith(".ts")) {
    return new Response(snippet.content);
  }

  return new Response(JSON.stringify(snippet));
};

export async function getStaticPaths() {
  const snippets = await getSnippets();

  return Promise.all(
    Object.entries(snippets).flatMap(([section, snippets]) =>
      Promise.all(
        snippets?.map(async (snippet) => {
          const metadata = await getSnippetMetadata(snippet);
          return [
            {
              params: { section, name: `${snippet.name}.json` },
              props: { snippet: metadata },
            },
            {
              params: { section, name: `${snippet.name}.ts` },
              props: { snippet: metadata },
            },
          ];
        }) ?? [],
      ),
    ),
  ).then((paths) => paths.flat(Infinity));
}
