import type { Snippet } from "@atmx-org/common";

export interface TemplateFrontmatter {
  title: string;
  description: string;
  slug: string;
}

export interface TemplateData {
  snippet: Snippet;
  frontmatter: string;
  example: string;
  code: string;
}
