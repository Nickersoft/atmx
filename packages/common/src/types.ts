import { SNIPPET_TYPES } from "./consts.js";

export type ImportGlob = Record<
  string,
  () => Promise<{ default: string }> | { default: string }
>;

export type SnippetType = (typeof SNIPPET_TYPES)[number];

export interface Dependencies {
  local: string[];
  external: string[];
}

export interface Snippet {
  id: string;
  type: SnippetType;
  category: string;
  name: string;
  content: string;
  urls: {
    ts: string;
    js: string;
    metadata: string;
    docs: string;
  };
  dependencies: Dependencies;
}

export interface TSDoc {
  description: string;
  parameters: { name: string; description: string }[];
  examples: string[];
}

export interface ExpandedSnippet extends Omit<Snippet, "urls">, TSDoc {
  content: string;
}

export type RegistryName = `${SnippetType}s`;

export type { SourceFile } from "ts-morph";
