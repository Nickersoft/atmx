import "core-js/features/object/group-by";

import type { APIRoute } from "astro";

import { extractDependencies } from "@/lib/ast";
import type { Snippet } from "@/types";

interface RawSnippet {
  section: string;
  category: string;
  name: string;
  content: string;
}

export const GET: APIRoute<{ snippets: RawSnippet[] }> = async ({
  url,
  props,
}) => {
  const { snippets: snippetList } = props;

  const snippets = snippetList.map(
    async ({ section, category, name: snippetName, content }) => {
      const dependencies = await extractDependencies(content);
      const name = snippetName.replace(".ts", "");
      const baseURL = `${url.origin}/registry/${section}`;
      return {
        category,
        name,
        urls: {
          code: `${baseURL}/${name}.ts`,
          metadata: `${baseURL}/${name}.json`,
        },
        dependencies,
      } satisfies Snippet;
    },
  );

  return new Response(JSON.stringify(await Promise.all(snippets)));
};

export async function getStaticPaths() {
  const files = await import.meta.glob("../../snippets/**/*.ts", {
    query: "?raw",
  });

  const snippets = await Promise.all(
    Object.entries(files).map(async ([path, content]) => {
      const [section, category, name] = path.split("/").slice(-3);

      return {
        section,
        category,
        name,
        content: ((await content()) as { default: string }).default,
      };
    }),
  );

  const groupedBySection = Object.groupBy(snippets, ({ section }) => section);

  return Object.entries(groupedBySection).map(([section, snippets]) => ({
    params: { section },
    props: { snippets },
  }));
}
