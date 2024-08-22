import { expect, test } from "vitest";
import { extractDependencies } from "./extract-dependencies.js";
import { createSourceFile } from "./ast.js";

export const code = `
import f1 from "some-external-lib";
import f2 from "@/snippets/helpers/array/groupBy";
`.trim();

test("Dependencies to be extracted correctly", async () => {
  const file = await createSourceFile("test", code);
  expect(await extractDependencies(file)).toStrictEqual({
    local: ["helpers/groupBy"],
    external: ["some-external-lib"],
  });
});
