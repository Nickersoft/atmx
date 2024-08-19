import "core-js/features/object/group-by";

import type { APIRoute } from "astro";
import {
  getRegistryName,
  type Snippet,
  type SnippetType,
} from "registry-tools";

import { getSnippets } from "@/lib/snippets";

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
            [snippet.name]: snippet,
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
