import "core-js/features/object/group-by";

import type { APIRoute } from "astro";

import type { Snippet } from "www/src/types";
import { getSnippets } from "www/src/lib/snippets";

export const GET: APIRoute<{ snippets: Snippet[] }> = async ({
  url,
  props,
}) => {
  const { snippets } = props;

  return new Response(
    JSON.stringify(
      snippets
        .map(({ urls, ...snippet }) => ({
          ...snippet,
          urls: {
            code: new URL(urls.code, url).toString(),
            metadata: new URL(urls.metadata, url).toString(),
          },
        }))
        .reduce(
          (acc, snippet) => ({
            ...acc,
            [snippet.name]: snippet,
          }),
          {},
        ),
    ),
  );
};

export async function getStaticPaths() {
  return Object.entries(await getSnippets()).map(([type, snippets]) => ({
    params: { type },
    props: { snippets },
  }));
}
