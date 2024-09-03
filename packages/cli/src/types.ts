import * as v from "valibot";

import type { SourceFile } from "@atmx-org/common";

import { configSchema, resolvedConfigSchema } from "./config/get-config.js";

export type PromiseLike<T> = T | Promise<T>;

export type Config = v.InferOutput<typeof configSchema>;

export type ResolvedConfig = v.InferOutput<typeof resolvedConfigSchema>;

export interface GlobalOptions {
  cwd: string;
}

export type Transformer = (
  sourceFile: SourceFile,
  config: ResolvedConfig,
) => PromiseLike<SourceFile>;
