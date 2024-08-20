import { basename, extname } from "node:path";

import { ImportGlob, Snippet, SnippetType } from "@/types.js";
import { transformImports } from "@/transformers/transform-imports.js";

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

      const name = basename(snippetName, extname(snippetName));
      const content = ((await getContent()) as { default: string }).default;

      const file = await createSourceFile(snippetName, content);
      const dependencies = await extractDependencies(file);
      const code = await transformImports(file, (source) =>
        source.replaceAll(/snippets\/(.+?)\/.+?\/(.+?)/g, "helpers/$2"),
      );

      return {
        type,
        category,
        dependencies,
        name,
        urls: {
          ts: `${baseURL}/${name}.ts`,
          js: `${baseURL}/${name}.js`,
          metadata: `${baseURL}/${name}.json`,
        },
        content: code.getFullText(),
      };
    }),
  );

  return group(snippets, ({ type }) => type) as Record<string, Snippet[]>;
}
