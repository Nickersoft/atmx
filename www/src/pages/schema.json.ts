import * as v from "valibot";
import type { APIRoute } from "astro";

import { configSchema } from "@atmx-org/common";
import { toJSONSchema } from "@gcornut/valibot-json-schema";

export const GET: APIRoute = () => {
  return new Response(
    JSON.stringify(
      toJSONSchema({
        ignoreUnknownValidation: true,
        schema: v.omit(configSchema, ["cwd"]),
      }),
    ),
  );
};
