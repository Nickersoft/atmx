import {
  transformAsync,
  type TransformOptions as BabelTransformOptions,
} from "@babel/core";

import type { VisitNodeObject, Node } from "@babel/traverse";

// @ts-expect-error: No typings needed
import babelTs from "@babel/preset-typescript";

export interface RemoveTypeOptions {
  /** Whether to remove ts-ignore and ts-expect-error comments */
  removeTsComments?: boolean;
  /** Escape hatch for customizing Babel configuration */
  customizeBabelConfig?(config: BabelTransformOptions): void;
}

export async function removeTypes(code: string, options: RemoveTypeOptions) {
  // We want to collapse newline runs created by removing types while preserving
  // newline runes in the original code. This is especially important for
  // template literals, which can contain literal newlines.
  // Keep track of how many newlines in a newline run were replaced.
  code = code.replace(
    /\n\n+/g,
    (match) => `\n/* @detype: empty-line=${match.length} */\n`,
  );

  // Babel visitor to remove leading comments
  const removeComments: VisitNodeObject<unknown, Node> = {
    enter(p) {
      if (!p.node.leadingComments) return;

      for (let i = p.node.leadingComments.length - 1; i >= 0; i--) {
        const comment = p.node.leadingComments[i]!;

        if (code.slice(comment.end).match(/^\s*\n\s*\n/)) {
          // There is at least one empty line between the comment and the TypeScript specific construct
          // We should keep this comment and those before it
          break;
        }

        comment.value = "@detype: remove-me";
      }
    },
  };

  const babelConfig: BabelTransformOptions = {
    filename: "tmp.ts",
    retainLines: true,
    plugins: [
      // Plugin to remove leading comments attached to TypeScript-only constructs
      {
        name: "detype-comment-remover",
        visitor: {
          TSTypeAliasDeclaration: removeComments,
          TSInterfaceDeclaration: removeComments,
          TSDeclareFunction: removeComments,
          TSDeclareMethod: removeComments,
          TSImportType: removeComments,
        },
      },
    ].filter(Boolean),
    presets: [babelTs],
    generatorOpts: {
      shouldPrintComment: (comment) =>
        comment !== "@detype: remove-me" &&
        (!options.removeTsComments ||
          !comment.match(/^\s*(@ts-ignore|@ts-expect-error)/)),
    },
  };

  if (options.customizeBabelConfig) {
    options.customizeBabelConfig(babelConfig);
  }

  const babelOutput = await transformAsync(code, babelConfig);

  if (
    !babelOutput ||
    babelOutput.code === undefined ||
    babelOutput.code === null
  ) {
    throw new Error("Babel error");
  }

  return (
    babelOutput.code
      .replaceAll(/\n\n*/g, "\n")
      // Subtract 2 from the newline count because we inserted two surrounding
      // newlines when we initially created the detype: empty-line comment.
      .replace(/\/\* @detype: empty-line=([0-9]+) \*\//g, (_match, p1) =>
        `\n`.repeat(p1 - 2),
      )
  );
}
