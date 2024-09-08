import { basename, extname } from "node:path";

import {
  type Snippet,
  type SnippetType,
  transformImports,
} from "@atmx-org/common";

import { camel } from "@/helpers/strings/camel.js";
import { pascal } from "@/helpers/strings/pascal.js";
import { group } from "@/helpers/arrays/group.js";

import { extractDependencies } from "@/extractors/extract-dependencies.js";

import { createSourceFile } from "../../../common/src/utils/ast.js";

type FilePath = string;

type FileContent = string;

export async function createRegistry(
  fileMap: Record<FilePath, FileContent>,
): Promise<Record<SnippetType, Snippet[]>> {
  const snippets = await Promise.all(
    Object.entries(fileMap).map(async ([path, content]) => {
      const [registry, category, snippetName] = path.split("/").slice(-3);

      const type = registry.slice(0, -1);
      const baseURL = `/registry/${registry}`;

      const id = basename(snippetName, extname(snippetName));
      const name = type === "type" ? pascal(id) : camel(id);

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
