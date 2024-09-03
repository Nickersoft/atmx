import { detect } from "detect-package-manager";

export async function getPackageManager(
  targetDir: string,
): Promise<ReturnType<typeof detect>> {
  return detect({ cwd: targetDir });
}
