import { REGISTRY_HOST, UTILITY_TYPES } from "@/consts.js";
import type { UtilityType } from "www/src/types.js";
import { pluralize } from "@/utils.js";
import { Argument, Command } from "commander";

async function getRegistry(category: UtilityType) {
  return fetch(`${REGISTRY_HOST}/registry/${pluralize(category)}.json`).then(
    (res) => res.json(),
  );
}

async function add(type: UtilityType, name: string) {
  const registry = await getRegistry(type);
  const utility = registry[name];

  if (!utility) {
    throw new Error(`No ${type} found with the name "${name}"!`);
  }

  // const { sn };

  console.log(type, name);
}

export default new Command("add")
  .addArgument(
    new Argument("<type>", "Type of component to import").choices(
      UTILITY_TYPES,
    ),
  )
  .argument("<name>", "Name of the component to import")
  .action(add);
