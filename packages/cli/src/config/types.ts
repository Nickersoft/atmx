import type { InferInput, InferOutput } from "valibot";

import type { configSchema } from "./schema.js";

export type ResolvedConfig = InferOutput<typeof configSchema>;

export type Config = InferInput<typeof configSchema>;
