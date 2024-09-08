import { getRegistryName, SNIPPET_TYPES } from "@atmx-org/common";
import { Argument, Command } from "commander";

import chalk from "chalk";

import { createAction } from "@/utils/create-action.ts";

import { add } from "./add.ts";
import { printTree } from "./utils/print-tree.ts";

const typeArg = new Argument(
  `<${SNIPPET_TYPES.join("|")}>`,
  "Type of component to import",
).choices(SNIPPET_TYPES);

const action = createAction(async ({ args: [type, name], cmd }) => {
  const summary = { addedDependencies: [], addedFiles: [] };

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
        name: chalk.bold("📄 New Files"),
        children: addedFiles.map((file) => ({
          name: chalk.green(`+ ${file}`),
        })),
      },
      ...(addedDependencies.length > 0
        ? [
            {
              name: chalk.bold("📦 New Dependencies"),
              children: addedDependencies.map((dep) => ({
                name: chalk.green(`+ ${dep}`),
              })),
            },
          ]
        : []),
    ],
    {
      label: "name",
      children: "children",
      rootLabel: chalk.underline(chalk.bold("Summary\n")),
    },
  );
});

export default new Command("add")
  .addArgument(typeArg)
  .argument("<name>", "Name of the component to import")
  .action(action);
