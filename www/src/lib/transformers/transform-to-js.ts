import { format, type Options as PrettierOptions } from "prettier";

import {
  type RemoveTypeOptions,
  removeTypes,
} from "@/lib/registry/remove-types";

export interface TransformOptions extends RemoveTypeOptions {
  /** Prettier options */
  prettierOptions?: PrettierOptions | null;
}

/**
 * Transform TypeScript code into vanilla JavaScript without affecting the formatting
 * @param code            Source coude
 * @param fileName        File name for the source
 * @param options         Options
 */
export async function transformToJS(
  code: string,
  options: TransformOptions = {},
): Promise<string> {
  const { prettierOptions, ...removeTypeOptions } = options;

  let propsContent = "";
  let emitsContent = "";

  code = code.replaceAll("\r\n", "\n");
  code = await removeTypes(code, removeTypeOptions);

  if (propsContent) {
    code = code.replace("defineProps(", (str) => `${str}${propsContent}`);
  }

  if (emitsContent) {
    code = code.replace("defineEmits(", (str) => `${str}${emitsContent}`);
  }

  code = await format(code, { parser: "typescript", ...prettierOptions });

  return code;
}
