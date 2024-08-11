import { basename, extname } from "node:path";

import type { APIRoute } from "astro";

import { extractDependencies, extractDocs } from "@/lib/ast";
import { transformCode } from "@/lib/snippets";
import type { SnippetMetadata } from "@/types";

export const GET: APIRoute = async ({ params, props }) => {
  const { name } = params;
  const { content, category } = props;

  if (name?.endsWith(".ts")) {
    return new Response(content);
  }

  const tsdoc = extractDocs(content);
  const dependencies = await extractDependencies(content);

  const metadata = {
    name: basename(name!, extname(name!)),
    ...tsdoc,
    category,
    dependencies,
    content: transformCode(content),
  } satisfies SnippetMetadata;

  return new Response(JSON.stringify(metadata));
};

export async function getStaticPaths() {
  const files = await import.meta.glob("../../../snippets/**/*.ts", {
    query: "?raw",
  });

  const snippets = await Promise.all(
    Object.entries(files).map(async ([path, content]) => {
      const [section, category, name] = path.split("/").slice(-3);

      return {
        section,
        category,
        name: name.replace(".ts", ""),
        content: ((await content()) as { default: string }).default,
      };
    }),
  );

  return Promise.all(
    snippets.flatMap(async ({ section, category, name, content }) => {
      const n = basename(name, extname(name));

      return [
        {
          params: { section, name: `${n}.json` },
          props: { category, content },
        },
        {
          params: { section, name: `${n}.ts` },
          props: { category, content },
        },
      ];
    }),
  ).then((paths) => paths.flat());
}
