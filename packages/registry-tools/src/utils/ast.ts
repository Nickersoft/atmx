import { mkdtemp } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";

import { Project, ScriptKind } from "ts-morph";

export const project = new Project({ compilerOptions: {} });

export async function createSourceFile(name: string, code: string) {
  const dir = await mkdtemp(join(tmpdir(), "tmp-"));
  const path = join(dir, `${name}.ts`);
  return project.createSourceFile(path, code, { scriptKind: ScriptKind.TS });
}
