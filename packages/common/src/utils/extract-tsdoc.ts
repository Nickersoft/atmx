// Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license.
// See LICENSE in the project root for license information.

import {
  getLeadingCommentRanges,
  getTrailingCommentRanges,
  ScriptTarget,
  type Node,
  SyntaxKind,
  type CommentRange,
  type SourceFile,
  createSourceFile,
} from "typescript";
import { TextRange, TSDocParser } from "@microsoft/tsdoc";

import type { Snippet, TSDoc } from "@/types.js";

import { Formatter } from "./formatter.js";

/**
 * Returns true if the specified SyntaxKind is part of a declaration form.
 *
 * Based on isDeclarationKind() from the compiler.
 * https://github.com/microsoft/TypeScript/blob/v3.0.3/src/compiler/utilities.ts#L6382
 */
function isDeclarationKind(kind: SyntaxKind): boolean {
  return (
    kind === SyntaxKind.ArrowFunction ||
    kind === SyntaxKind.BindingElement ||
    kind === SyntaxKind.ClassDeclaration ||
    kind === SyntaxKind.ClassExpression ||
    kind === SyntaxKind.Constructor ||
    kind === SyntaxKind.EnumDeclaration ||
    kind === SyntaxKind.EnumMember ||
    kind === SyntaxKind.ExportSpecifier ||
    kind === SyntaxKind.FunctionDeclaration ||
    kind === SyntaxKind.FunctionExpression ||
    kind === SyntaxKind.GetAccessor ||
    kind === SyntaxKind.ImportClause ||
    kind === SyntaxKind.ImportEqualsDeclaration ||
    kind === SyntaxKind.ImportSpecifier ||
    kind === SyntaxKind.InterfaceDeclaration ||
    kind === SyntaxKind.JsxAttribute ||
    kind === SyntaxKind.MethodDeclaration ||
    kind === SyntaxKind.MethodSignature ||
    kind === SyntaxKind.ModuleDeclaration ||
    kind === SyntaxKind.NamespaceExportDeclaration ||
    kind === SyntaxKind.NamespaceImport ||
    kind === SyntaxKind.Parameter ||
    kind === SyntaxKind.PropertyAssignment ||
    kind === SyntaxKind.PropertyDeclaration ||
    kind === SyntaxKind.PropertySignature ||
    kind === SyntaxKind.SetAccessor ||
    kind === SyntaxKind.ShorthandPropertyAssignment ||
    kind === SyntaxKind.TypeAliasDeclaration ||
    kind === SyntaxKind.TypeParameter ||
    kind === SyntaxKind.VariableDeclaration ||
    kind === SyntaxKind.JSDocTypedefTag ||
    kind === SyntaxKind.JSDocCallbackTag ||
    kind === SyntaxKind.JSDocPropertyTag
  );
}

/**
 * Retrieves the JSDoc-style comments associated with a specific AST node.
 *
 * Based on getJSDocCommentRanges() from the compiler.
 * https://github.com/microsoft/TypeScript/blob/v3.0.3/src/compiler/utilities.ts#L924
 */
function getJSDocCommentRanges(node: Node, text: string): CommentRange[] {
  const commentRanges: CommentRange[] = [];

  switch (node.kind) {
    case SyntaxKind.Parameter:
    case SyntaxKind.TypeParameter:
    case SyntaxKind.FunctionExpression:
    case SyntaxKind.ArrowFunction:
    case SyntaxKind.ParenthesizedExpression:
      commentRanges.push(...(getTrailingCommentRanges(text, node.pos) || []));
      break;
  }

  commentRanges.push(...(getLeadingCommentRanges(text, node.pos) || []));
  // console.log(
  //   text.substring(node.pos, node.end),
  //   getLeadingCommentRanges(text, node.pos),
  // );
  // True if the comment starts with '/**' but not if it is '/**/'
  return commentRanges.filter(
    (comment) =>
      text.charCodeAt(comment.pos + 1) === 0x2a /* CharacterCodes.asterisk */ &&
      text.charCodeAt(comment.pos + 2) === 0x2a /* CharacterCodes.asterisk */ &&
      text.charCodeAt(comment.pos + 3) !== 0x2f /* CharacterCodes.slash */,
  );
}

interface IFoundComment {
  compilerNode: Node;
  textRange: TextRange;
}

function walkCompilerAstAndFindComments(
  func: string,
  node: Node,
  indent: string,
  foundComments: IFoundComment[],
): void {
  // The TypeScript AST doesn't store code comments directly.  If you want to find *every* comment,
  // you would need to rescan the SourceFile tokens similar to how tsutils.forEachComment() works:
  // https://github.com/ajafff/tsutils/blob/v3.0.0/util/util.ts#L453
  //
  // However, for this demo we are modeling a tool that discovers declarations and then analyzes their doc comments,
  // so we only care about TSDoc that would conventionally be associated with an interesting AST node.

  const buffer: string = node.getSourceFile().getFullText(); // don't use getText() here!

  // Only consider nodes that are part of a declaration form.  Without this, we could discover
  // the same comment twice (e.g. for a MethodDeclaration and its PublicKeyword).

  if (isDeclarationKind(node.kind)) {
    const foundIdentifier = node
      .getChildren()
      .filter((n) => n.kind === SyntaxKind.Identifier)
      .map((n) => n.getText())
      .filter((n) => n === func)[0];

    if (!foundIdentifier) {
      return;
    }

    // Find "/** */" style comments associated with this node.
    // Note that this reinvokes the compiler's scanner -- the result is not cached.
    const comments: CommentRange[] = getJSDocCommentRanges(node, buffer);

    if (comments.length > 0) {
      for (const comment of comments) {
        foundComments.push({
          compilerNode: node,
          textRange: TextRange.fromStringRange(
            buffer,
            comment.pos,
            comment.end,
          ),
        });
      }
    }
  }

  return node.forEachChild((child) =>
    walkCompilerAstAndFindComments(func, child, indent + "  ", foundComments),
  );
}

function extractDocs(code: string): TSDoc {
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

export function extractTSDoc(snippet: Snippet): TSDoc {
  const sourceFile: SourceFile = createSourceFile(
    "tmp.ts",
    snippet.content,
    ScriptTarget.ES5,
    true,
  );

  if (!sourceFile) {
    throw new Error("Error retrieving source file");
  }

  const foundComments: IFoundComment[] = [];

  walkCompilerAstAndFindComments(snippet.name, sourceFile, "", foundComments);

  if (foundComments.length >= 1) {
    return extractDocs(foundComments[0].textRange.toString());
  }

  console.warn("Couldn't find TSDocs for function: " + snippet.name);

  return {
    description: "",
    parameters: [],
    examples: [],
  };
}
