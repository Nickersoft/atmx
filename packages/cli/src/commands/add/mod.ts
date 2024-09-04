import { getRegistryName, SNIPPET_TYPES } from "@atmx-org/common";
import { Argument, Command } from "commander";

import { createAction } from "@/utils/create-action.js";

import { add } from "./add.js";

const typeArg = new Argument(
  `<${SNIPPET_TYPES.join("|")}>`,
  "Type of component to import",
).choices(SNIPPET_TYPES);

const action = createAction(({ args: [type, name], cmd }) =>
  add({
    ...cmd.optsWithGlobals(),
    registry: getRegistryName(type),
    type,
    name,
    logging: true,
  }),
);

export default new Command("add")
  .addArgument(typeArg)
  .argument("<name>", "Name of the component to import")
  .action(action);
