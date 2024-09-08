import { readPackageJSON } from "@/utils/environment.ts";

/**
 * Only returns the packages that are not already installed.
 * @param packages - List of packages to install.
 * @returns List of packages that are not already installed.
 */
export async function filterInstalled(
  cwd: string,
  packages: string | string[],
): Promise<string[]> {
  const packageJSON = await readPackageJSON(cwd);

  if (!packageJSON) return [];

  const { dependencies, devDependencies } = packageJSON;

  const installed = [
    ...Object.keys(dependencies ?? {}),
    ...Object.keys(devDependencies ?? {}),
  ];

  return (Array.isArray(packages) ? packages : [packages]).filter(
    (pkg) => !installed.includes(pkg),
  );
}
