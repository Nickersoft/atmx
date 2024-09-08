import type { SourceFile } from "@atmx-org/common";
import type { ResolvedConfig } from "./config/types.ts";

export type PromiseLike<T> = T | Promise<T>;

export interface GlobalOptions {
  cwd: string;
}

export type Transformer = (
  sourceFile: SourceFile,
  config: ResolvedConfig,
) => PromiseLike<SourceFile>;
