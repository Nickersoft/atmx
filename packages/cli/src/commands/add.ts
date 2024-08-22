import { dirname, relative } from "node:path";

import { Argument, Command } from "commander";

import { confirm } from "@inquirer/prompts";

import ora from "ora";

import type { GlobalOptions } from "@/types.js";
import { installPackages } from "@/utils/install-packages.js";

import { getOutputPath, installSnippet } from "@/utils/install-snippet.js";
import { getConfig } from "@/utils/get-config.js";
import {
  getRegistry,
  getRegistryName,
  SNIPPET_TYPES,
  type RegistryName,
  type SnippetType,
} from "@atmx-org/common";
import { pathExists } from "fs-extra";

interface AddOptions extends GlobalOptions {
  registry: RegistryName;
  name: string;
  type: SnippetType;
  logging?: boolean;
}

async function installDeps(deps: string[], options: AddOptions) {
  if (deps.length === 0) return;

  await Promise.all(
    deps
      .map((d) => d.split("/"))
      .map(([registry, name]) =>
        add({
          ...options,
          registry: registry as RegistryName,
          name,
          logging: false,
        }),
      ),
  );
}

async function add(opts: AddOptions) {
  const { logging, name, type, registry: registryName } = opts;

  const config = await getConfig();
  const registry = await getRegistry(registryName);
  const snippet = registry[name];

  if (!snippet) {
    throw new Error(`No ${type} found with the name "${name}"!`);
  }

  const outputPath = await getOutputPath(snippet, config);

  if (logging && (await pathExists(outputPath))) {
    const shouldOverwrite = await confirm({
      message: `A snippet for '${snippet.name}' already exists. Would you like to override it?`,
    });

    if (!shouldOverwrite) return;
  } else if (logging) {
    const shouldInstall = await confirm({
      message: `This command will install the ${type} '${name}' to the directory '${relative(opts.cwd, dirname(outputPath))}'. Would you like to continue?`,
    });

    if (!shouldInstall) return;
  }

  const spinner = ora({ isSilent: !logging }).start();

  spinner.text = `Adding ${type} ${name}...`;

  const {
    dependencies: { local, external },
  } = snippet;

  if (local.length > 0 || external.length > 0) {
    spinner.text = "Installing dependencies...";
    await Promise.all([installDeps(local, opts), installPackages(external)]);
  }

  spinner.text = `Installing '${name}'...`;

  await installSnippet(snippet, config);

  spinner.succeed(`Installed ${type} ${name}!`);
}

export default new Command("add")
  .addArgument(
    new Argument("<type>", "Type of component to import").choices(
      SNIPPET_TYPES,
    ),
  )
  .argument("<name>", "Name of the component to import")
  .action((type, name, opts, cmd: Command) =>
    add({
      ...cmd.optsWithGlobals(),
      registry: getRegistryName(type),
      type,
      name,
      logging: true,
    }),
  );
