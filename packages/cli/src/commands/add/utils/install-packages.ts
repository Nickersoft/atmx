import { execa } from "execa";

import { detectPackageManager } from "@/utils/environment.ts";
import type { AddOptions } from "../types.ts";
import { getInstalledPackages } from "./get-installed-packages.ts";

/**
 * Installs external packages using the detected package manager.
 * @param packages - List of packages to install.
 * @returns Promise that resolves when the installation is complete.
 */
export async function installPackages(
  packages: string,
  opts: AddOptions,
): Promise<string[]>;

export async function installPackages(
  packages: string[],
  opts: AddOptions,
): Promise<string[]>;

export async function installPackages(
  packages: string | string[],
  opts: AddOptions,
): Promise<string[]> {
  if (packages.length === 0) return [];

  let pm = await detectPackageManager(opts.cwd);

  const pkgs = typeof packages === "string" ? [packages] : packages;

  const installed = await getInstalledPackages(opts.cwd);

  const newPackages = pkgs.filter(
    (pkg) =>
      !opts.summary.addedDependencies.includes(pkg) && !installed.includes(pkg),
  );

  if (newPackages.length === 0) return [];

  const command = pm === "npm" ? "install" : "add";

  const { stderr, exitCode } =
    await execa`${pm} ${command} ${newPackages.join(" ")}`;

  if (exitCode !== 0) {
    throw new Error(`An error occurred installing dependencies: ${stderr}`);
  }

  return newPackages;
}
