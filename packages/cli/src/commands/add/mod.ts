import { getRegistryName, SNIPPET_TYPES } from "@atmx-org/common";
import { Argument, Command } from "commander";

import { add } from "./add.js";

export default new Command("add")
  .addArgument(
    new Argument(
      `<${SNIPPET_TYPES.join("|")}>`,
      "Type of component to import",
    ).choices(SNIPPET_TYPES),
  )
  .argument("<name>", "Name of the component to import")
  .action((type, name, cmd: Command) =>
    add({
      ...cmd.optsWithGlobals(),
      registry: getRegistryName(type),
      type,
      name,
      logging: true,
    }),
  );
