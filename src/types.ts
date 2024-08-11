export interface Dependencies {
  local: string[];
  external: string[];
}

export interface Snippet {
  category: string;
  name: string;
  urls: {
    code: string;
    metadata: string;
  };
  dependencies: Dependencies;
}

export interface TSDoc {
  description: string;
  parameters: { name: string; description: string }[];
  examples: string[];
}

export interface SnippetMetadata extends Omit<Snippet, "urls">, TSDoc {
  content: string;
}
