import { execa } from "execa";

import { detectPackageManager } from "@/utils/environment.ts";

/**
 * Installs external packages using the detected package manager.
 * @param packages - List of packages to install.
 * @returns Promise that resolves when the installation is complete.
 */
export async function installPackages(
  packages: string,
  cwd?: string,
): Promise<void>;

export async function installPackages(
  packages: string[],
  cwd?: string,
): Promise<void>;

export async function installPackages(
  packages: string | string[],
  cwd: string = process.cwd(),
): Promise<void> {
  if (packages.length === 0) return;

  let pm = await detectPackageManager(cwd);

  const packageList =
    typeof packages === "string" ? packages : packages.join(" ");

  const command = pm === "npm" ? "install" : "add";

  const { stderr, exitCode } = await execa`${pm} ${command} ${packageList}`;

  if (exitCode !== 0) {
    throw new Error(`An error occurred installing dependencies: ${stderr}`);
  }
}
