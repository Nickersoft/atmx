import { configSchema } from "@/config.js";
import { writeFile } from "fs/promises";

import { zodToJsonSchema } from "zod-to-json-schema";

export const jsonSchema = zodToJsonSchema(configSchema);

await writeFile("schema.json", JSON.stringify(jsonSchema, null, 2));
