import { getRegistryName, SNIPPET_TYPES } from "@atmx-org/common";
import { Argument, Command } from "commander";

import pc from "picocolors";

import { createAction } from "@/utils/create-action.ts";

import { add } from "./add.ts";
import { printTree } from "./utils/print-tree.ts";

const typeArg = new Argument(
  `<${SNIPPET_TYPES.join("|")}>`,
  "Type of component to import",
).choices(SNIPPET_TYPES);

const action = createAction(async ({ args: [type, name], cmd }) => {
  const summary = { addedSnippets: [], addedDependencies: [], addedFiles: [] };

  await add({
    ...cmd.optsWithGlobals(),
    summary,
    registry: getRegistryName(type),
    type,
    name,
    logging: true,
  });

  const { addedFiles, addedDependencies } = summary;

  printTree(
    [
      {
        name: pc.bold("📄 New Files"),
        children: Array.from(new Set(addedFiles)).map((file) => ({
          name: pc.green(`+ ${file}`),
        })),
      },
      ...(addedDependencies.length > 0
        ? [
            {
              name: pc.bold("📦 New Dependencies"),
              children: Array.from(new Set(addedDependencies)).map((dep) => ({
                name: pc.green(`+ ${dep}`),
              })),
            },
          ]
        : []),
    ],
    {
      label: "name",
      children: "children",
      rootLabel: pc.underline(pc.bold("Summary\n")),
    },
  );
});

export default new Command("add")
  .addArgument(typeArg)
  .argument("<name>", "Name of the component to import")
  .action(action);
