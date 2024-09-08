import { createSnippets } from "./create-snippets";

export type ImportGlob = Record<
  string,
  () => Promise<{ default: string }> | { default: string }
>;

export async function getSnippets() {
  const files = await import.meta.glob(
    [
      "../../../packages/registry/src/**/*.ts",
      "!../../../packages/registry/src/**/*.test.ts",
    ],
    {
      query: "raw",
    },
  );
  return createSnippets(files as ImportGlob);
}
