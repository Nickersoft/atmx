import { expect, test } from "vitest";

import { createSourceFile } from "@atmx-org/common";

import { extractDependencies } from "./extract-dependencies.ts";

export const code = `
import f1 from "some-external-lib";
import f2 from "@/helpers/arrays/groupBy";
`.trim();

test("dependencies to be extracted correctly", async () => {
  const file = await createSourceFile("test", code);
  expect(await extractDependencies(file)).toStrictEqual({
    local: ["helpers/groupBy"],
    external: ["some-external-lib"],
  });
});
