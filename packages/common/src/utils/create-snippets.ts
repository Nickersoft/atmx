import { basename, extname } from "node:path";

import type { ImportGlob, Snippet, SnippetType } from "@/types.js";
import { transformImports } from "@/transformers/transform-imports.js";

import { camel } from "@/helpers/strings/camel.js";
import { pascal } from "@/helpers/strings/pascal.js";

import { extractDependencies } from "./extract-dependencies.js";
import { createSourceFile } from "./ast.js";
import { group } from "./group.js";

export async function createSnippets(
  files: ImportGlob,
): Promise<Record<SnippetType, Snippet[]>> {
  const snippets = await Promise.all(
    Object.entries(files).map(async ([path, getContent]) => {
      const [registry, category, snippetName] = path.split("/").slice(-3);

      const type = registry.slice(0, -1);
      const baseURL = `/registry/${registry}`;

      const id = basename(snippetName, extname(snippetName));
      const name = type === "type" ? pascal(id) : camel(id);
      const content = ((await getContent()) as { default: string }).default;

      const file = await createSourceFile(snippetName, content);
      const dependencies = await extractDependencies(file);
      const code = await transformImports(file, (source) =>
        source.replaceAll(/\/(.+?)\/.+?\/(.+?)/g, "/helpers/$2"),
      );

      return {
        id,
        type,
        category,
        dependencies,
        name,
        urls: {
          ts: `${baseURL}/${id}.ts`,
          js: `${baseURL}/${id}.js`,
          docs: `/${registry}/${id}`,
          metadata: `${baseURL}/${id}.json`,
        },
        content: code.getFullText(),
      };
    }),
  );

  return group(snippets, ({ type }) => type) as Record<string, Snippet[]>;
}
