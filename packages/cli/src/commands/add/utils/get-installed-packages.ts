import { readPackageJSON } from "@/utils/environment.ts";

/**
 * Returns all NPM dependencies of the current project.
 * @param packages - List of packages to install.
 * @returns List of packages that are not already installed.
 */
export async function getInstalledPackages(cwd: string): Promise<string[]> {
  const packageJSON = await readPackageJSON(cwd);

  if (!packageJSON) return [];

  const { dependencies, devDependencies } = packageJSON;

  return [
    ...Object.keys(dependencies ?? {}),
    ...Object.keys(devDependencies ?? {}),
  ];
}
