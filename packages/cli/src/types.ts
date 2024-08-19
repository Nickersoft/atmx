import * as z from "zod";

import { configSchema, resolvedConfigSchema } from "./utils/get-config.js";
import { SourceFile } from "ts-morph";

export type PromiseLike<T> = T | Promise<T>;

export type Config = z.infer<typeof configSchema>;

export type ResolvedConfig = z.infer<typeof resolvedConfigSchema>;

export interface GlobalOptions {
  cwd: string;
}

export type Transformer = (
  sourceFile: SourceFile,
  config: ResolvedConfig,
) => PromiseLike<SourceFile>;
