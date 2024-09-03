import ora from "ora";

import { type RegistryName } from "@atmx-org/common";

import { installPackages } from "@/utils/install-packages.js";

import { getConfig } from "@/config/get-config.js";

import type { AddOptions } from "./types.js";
import { resolveSnippet } from "./resolve-snippet.js";
import { getOutputPath } from "./get-output-path.js";
import { installSnippet } from "@/utils/install-snippet.js";

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

export async function add(opts: AddOptions) {
  const { overwrite, logging, name, type, registry: registryName } = opts;

  // Retrieve the user config
  const config = await getConfig(opts.cwd);

  // Find the snippet by name and error if not found
  const snippet = await resolveSnippet({ type, name, registryName });

  if (snippet) {
    const outputPath = await getOutputPath({ snippet, overwrite, config });

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

    await installSnippet({ snippet, config, outputPath });

    spinner.succeed(`Installed ${type} ${name}!`);
  }
}
