import { transform } from "detype";

export * from "./snippets.js";
export * from "./types.js";

export function ts2js(code: string) {
  return transform(code, "tmp.ts");
}
