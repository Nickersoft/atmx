import { Argument, Command } from "commander";
import type { Snippet } from "registry-tools";
import ora from "ora";

import { REGISTRY_HOST, UTILITY_TYPES } from "@/consts.js";
import type { UtilityConfig, UtilityType } from "@/types.js";
import { installPackages, pluralize } from "@/utils.js";

const getRegistry = (() => {
  const registryCache = new Map<UtilityType, Record<string, Snippet>>();

  return async function (
    category: UtilityType,
  ): Promise<Record<string, Snippet>> {
    if (registryCache.has(category)) {
      return registryCache.get(category)!;
    }

    const url = new URL(`/registry/${pluralize(category)}.json`, REGISTRY_HOST);
    const registry = await fetch(url).then((res) => res.json());

    registryCache.set(category, registry);

    return registry;
  };
})();

async function installExternalDeps(deps: string[]) {
  await installPackages(deps);
}

async function installLocalDeps(deps: string[]) {
  await Promise.all(
    deps
      .map((d) => d.split("/"))
      .map(([type, name]) => add(type as UtilityType, name)),
  );
}

function getCode(type: UtilityType, name: string, typescript?: boolean) {
  const path = `/registry/${type}/${name}${typescript ? ".ts" : ".js"}`;
  const url = new URL(path, REGISTRY_HOST);
  return fetch(url).then((res) => res.text());
}

async function installCode(
  type: UtilityType,
  name: string,
  config: UtilityConfig,
) {
  const code = await getCode(type, name, config.ts);
  const aliasKey = pluralize(type) as keyof UtilityConfig["aliases"];
  const alias = config.aliases?.[aliasKey];
  const ext = config.ts ? "ts" : "js";
  const outputPath = `${alias}/${name}.${ext}`;
}

async function add(type: UtilityType, name: string) {
  const spinner = ora(`Resolving ${name}...`).start();

  const registry = await getRegistry(type);
  const utility = registry[name];

  if (!utility) {
    throw new Error(`No ${type} found with the name "${name}"!`);
  }

  spinner.text = `Adding ${type} ${name}...`;

  const {
    dependencies: { local, external },
  } = utility;

  if (local.length > 0 || external.length > 0) {
    spinner.text = "Installing dependencies...";
    await Promise.all([installLocalDeps(local), installExternalDeps(external)]);
  }

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
