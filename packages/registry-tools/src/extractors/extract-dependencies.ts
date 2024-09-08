import type { Dependencies } from "@atmx-org/common";

import type { SourceFile } from "ts-morph";

const LOCAL_REGEX = /^@\/(.+)\/.+\/([^.]+)(?:.[jt]s?)?$/;
const ORG_REGEX = /^(@[^\/]+\/[^\/]+)\/?.*$/;
const PKG_REGEX = /^([^@][^\/]+)\/?.*$/;

export async function extractDependencies(
  sourceFile: SourceFile,
): Promise<Dependencies> {
  return sourceFile
    .getImportDeclarations()
    .map((node) => node.getModuleSpecifierValue())
    .reduce(
      (acc, source) => {
        const fromLocal = source.match(LOCAL_REGEX);

        if (fromLocal) {
          acc.local.push(fromLocal.slice(1).join("/"));
        } else {
          const fromOrg = source.match(ORG_REGEX);

          if (fromOrg) {
            acc.external.push(fromOrg[1]);
          } else {
            const fromPkg = source.match(PKG_REGEX);

            if (fromPkg) {
              acc.external.push(fromPkg[1]);
            }
          }
        }

        return acc;
      },
      { local: [] as string[], external: [] as string[] },
    );
}
