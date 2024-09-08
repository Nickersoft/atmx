import type { InferInput, InferOutput } from "valibot";

import type { configSchema } from "./schema.ts";

export type ResolvedConfig = InferOutput<typeof configSchema>;

export type Config = InferInput<typeof configSchema>;
