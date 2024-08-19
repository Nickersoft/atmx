import { detect } from "detect-package-manager";
import { $, type Result } from "execa";

export function pluralize(word: string) {
  return word + "s";
}

/**
 * Installs external packages using the detected package manager.
 * @param packages - List of packages to install.
 * @returns Promise that resolves when the installation is complete.
 */
export async function installPackages(packages: string): Promise<void>;
export async function installPackages(packages: string[]): Promise<void>;
export async function installPackages(
  packages: string | string[],
): Promise<void> {
  const pm = await detect();

  const packageList =
    typeof packages === "string" ? packages : packages.join(" ");

  const command = pm === "npm" ? "install" : "add";

  const { stderr } = await $`${pm} ${command} ${packageList}`;

  if (stderr) {
    throw new Error(`An error occurred installing dependencies: ${stderr}`);
  }
}
