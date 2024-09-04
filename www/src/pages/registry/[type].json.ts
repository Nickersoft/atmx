import type { APIRoute } from "astro";
import {
  getRegistryName,
  type Snippet,
  type SnippetType,
} from "@atmx-org/common";

import { getSnippets } from "@/lib/get-snippets";

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
            ts: new URL(urls.ts, url).toString(),
            js: new URL(urls.js, url).toString(),
            metadata: new URL(urls.metadata, url).toString(),
          },
        }))
        .reduce(
          (acc, snippet) => ({
            ...acc,
            [snippet.id]: snippet,
          }),
          {},
        ),
    ),
  );
};

export async function getStaticPaths() {
  return Object.entries(await getSnippets()).map(([type, snippets]) => ({
    params: { type: getRegistryName(type as SnippetType) },
    props: { snippets },
  }));
}
