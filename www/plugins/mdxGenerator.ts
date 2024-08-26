import fs from "fs/promises";
import path, { dirname } from "path";
import { Eta } from "eta";
import { getSnippets } from "../src/lib/get-snippets";
import { expandSnippet, getRegistryName, type Snippet } from "@atmx-org/common";
import { getSnippetsForSideBar } from "./utils";
import matter from "gray-matter";

import type {
  StarlightPlugin,
} from "@astrojs/starlight/types";
import { fileURLToPath } from "url";

interface SnippetData {
  functionName: string;
  description: string;
  example: string;
  rawCode: string;
}

async function starlightSnippetConverter(): Promise<void> {
  const outputRootDir = "../www/src/content/docs/generated";

  const __dirname = dirname(fileURLToPath(import.meta.url));

  const eta = new Eta({ views: path.join(__dirname, "templates") });

  async function processSnippet(snippet: Snippet): Promise<void> {
    const rawCode = snippet.content;

    const expanded = await expandSnippet(snippet);
    const registry = getRegistryName(snippet.type);
    const snippetData: SnippetData = {
      functionName: snippet.name,
      description: expanded.description,
      example: expanded.examples[0],
      rawCode,
    };

    const result = eta.render("mdx", snippetData);

    const outputDir = path.join(outputRootDir, registry, expanded.category);
    await fs.mkdir(outputDir, { recursive: true });

    const outputPath = path.join(outputDir, `${snippet.name}.mdx`);
    await fs.writeFile(outputPath, result, "utf8");

    console.log(`MDX file "${outputPath}" has been created successfully.`);
  }

  const snippets: [string, Snippet[]][] = getSnippetsForSideBar(
    await getSnippets(),
  );

  await Promise.all(
    snippets.map(async (entry) => {
      await Promise.all(entry[1].map((s: Snippet) => processSnippet(s)));
    }),
  );

  console.log("All snippets processed and converted to MDX.");
}

export default {
  name: "mdx-generator",
  hooks: {
    async setup({ updateConfig, config }) {
      await starlightSnippetConverter();
      const contentFolderPath = "./src/content/docs";
      const items = [];
      const children = await fs.readdir(contentFolderPath, {
        withFileTypes: true,
      });
      for (const entry of children) {
        if (entry.isFile() && entry.name.endsWith(".md")) {
          const fileContent = await fs.readFile(
            path.join(entry.parentPath, entry.name),
          );
          const frontMatter = matter(fileContent);
          items.push({
            order: frontMatter.data?.sidebar?.order,
            slug: entry.name.split(".")[0],
          });
        }
      }
      items.sort((a, b) => {
        if (a.order == null && b.order == null) {
          return 0;
        }
        if (a.order == null) {
          return 1;
        }
        if (b.order == null) {
          return -1;
        }
        return a.order < b.order ? -1 : 1;
      });

      updateConfig({
        sidebar: [
          ...items.map(i=>({slug: i.slug})),
          {
            label: "Helpers",
            collapsed: true,
            autogenerate: { directory: "generated/helpers", collapsed: true },
          },
        ],
      });
    },
  },
} satisfies StarlightPlugin;
