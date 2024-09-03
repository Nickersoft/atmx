import type { InferInput, InferOutput } from "valibot";

import type { SourceFile } from "@atmx-org/common";

import { configSchema, resolvedConfigSchema } from "./config/schema.js";

export type PromiseLike<T> = T | Promise<T>;

export type { InferInput as Input, InferOutput as Output };

export type Config = typeof configSchema;

export type ResolvedConfig = typeof resolvedConfigSchema;

export interface GlobalOptions {
  cwd: string;
}

export type Transformer = (
  sourceFile: SourceFile,
  config: InferOutput<ResolvedConfig>,
) => PromiseLike<SourceFile>;
