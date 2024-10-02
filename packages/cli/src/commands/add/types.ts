import type { RegistryName, SnippetType } from "@atmx-org/common";

import type { GlobalOptions } from "@/types.ts";
import type { Ora } from "ora";

export interface AddOptions extends GlobalOptions {
  registry: RegistryName;
  name: string;
  type: SnippetType;
  logging?: boolean;
  overwrite?: boolean;
  summary: AddSummary;
}

export interface AddSummary {
  addedDependencies: string[];
  addedFiles: string[];
  addedSnippets: string[];
}
