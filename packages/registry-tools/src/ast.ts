import { TSDocParser } from "@microsoft/tsdoc";
import { parse } from "@swc/core";

import { Formatter } from "@/formatter.js";
import type { Dependencies, TSDoc } from "@/types.js";

export async function extractDependencies(code: string): Promise<Dependencies> {
  const module = await parse(code, {
    syntax: "typescript",
    comments: true,
    script: true,
  });

  return module.body
    .filter((node) => node.type === "ImportDeclaration")
    .map((node) => node.source.value)
    .reduce(
      (acc, source) => {
        const match = source.match(/@\/snippets\/(.+)\/.+\/(.+)/);

        if (source === "@/snippets/helpers/types") {
          acc.local.push("helpers/types");
          return acc;
        } else if (match) {
          acc.local.push(`${match[1]}/${match[2]}`);
        } else {
          acc.external.push(source);
        }

        return acc;
      },
      { local: [] as string[], external: [] as string[] },
    );
}

export function extractDocs(code: string): TSDoc {
  const parser = new TSDocParser();

  const { summarySection, params, customBlocks } =
    parser.parseString(code).docComment;

  const description = Formatter.renderDocNode(summarySection).trim();

  const parameters = params.blocks.map((param) => {
    const parameterName = param.parameterName;
    const parameterDescription = Formatter.renderDocNode(param.content).trim();

    return { name: parameterName, description: parameterDescription };
  });

  const examples = customBlocks
    .filter((block) => block.blockTag.tagName === "@example")
    .map((ex) =>
      Formatter.renderDocNode(ex.content)
        .replaceAll("```ts", "")
        .replaceAll("```", "")
        .trim(),
    );

  return { description, parameters, examples };
}
