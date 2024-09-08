import { relative } from "node:path";

import chalk from "chalk";

import type { RegistryName } from "@atmx-org/common";

import { getConfig } from "@/config/get-config.ts";

import { installSnippet } from "./utils/install-snippet.ts";
import { installPackages } from "./utils/install-packages.ts";
import { filterInstalled } from "./utils/filter-installed.ts";
import { resolveSnippet } from "./utils/resolve-snippet.ts";
import { getOutputPath } from "./utils/get-output-path.ts";

import type { AddOptions } from "./types.ts";

import { createSpinner } from "@/spinners.ts";

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
    const { outputPath, force } = await getOutputPath({
      snippet,
      overwrite,
      config,
    });

    const spinner = createSpinner({ isSilent: !logging }).start();

    spinner.text = `Adding ${type} ${name}...`;

    const {
      dependencies: { local, external },
    } = snippet;

    if (local.length > 0 || external.length > 0) {
      spinner.text = "Installing dependencies...";

      const pkgs = await filterInstalled(opts.cwd, external);

      await Promise.all([
        installDeps(local, { ...opts, overwrite: force }),
        installPackages(pkgs),
      ]);

      opts.summary.addedDependencies.push(...pkgs);
    }

    spinner.text = `Installing '${name}'...`;

    await installSnippet({ snippet, config, outputPath });

    spinner.stop();

    console.log(`\n✨ Installed ${type}: ${chalk.bold(name)}\n`);

    opts.summary.addedFiles.push(relative(opts.cwd, outputPath));
  }
}
