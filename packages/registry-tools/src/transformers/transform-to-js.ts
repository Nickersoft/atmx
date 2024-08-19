import { transform } from "detype";

export function transformToJS(code: string) {
  return transform(code, "tmp.ts");
}
