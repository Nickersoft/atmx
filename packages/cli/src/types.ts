import * as z from "zod";

import { configSchema } from "./config.js";
import { UTILITY_TYPES } from "./consts.js";

export type UtilityConfig = z.infer<typeof configSchema>;

export type UtilityType = (typeof UTILITY_TYPES)[number];
