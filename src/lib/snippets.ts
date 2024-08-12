import "core-js/features/object/group-by";

import { basename, extname } from "node:path";

import { extractDependencies, extractDocs } from "./ast";
import type { Snippet, SnippetMetadata } from "@/types";

export function transformCode(code: string) {
  return code.replaceAll(/snippets\/(.+?)\/.+?\/(.+?)/g, "helpers/$2");
}

export async function getSnippets(): Promise<Record<string, Snippet[]>> {
  const files = await import.meta.glob("../snippets/**/*.ts", {
    query: "?raw",
  });

  const snippets = await Promise.all(
    Object.entries(files).map(async ([path, content]) => {
      const [section, category, snippetName] = path.split("/").slice(-3);

      const code = ((await content()) as { default: string }).default;
      const baseURL = `/registry/${section}`;
      const dependencies = await extractDependencies(code);
      const name = basename(snippetName, extname(snippetName));

      return {
        section,
        category,
        dependencies,
        name,
        urls: {
          code: `${baseURL}/${name}.ts`,
          metadata: `${baseURL}/${name}.json`,
        },
        content: transformCode(code),
      };
    }),
  );

  return Object.groupBy(snippets, ({ section }) => section) as Record<
    string,
    Snippet[]
  >;
}

export async function getSnippetMetadata(snippet: Snippet) {
  const tsdoc = extractDocs(snippet.content);

  return {
    ...snippet,
    ...tsdoc,
  } satisfies SnippetMetadata;
}
