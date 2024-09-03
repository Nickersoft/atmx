import {
  getRegistry,
  type RegistryName,
  type SnippetType,
} from "@atmx-org/common";

import { getConfig } from "@/config/get-config.js";
import ora from "ora";

interface ResolveRegistryOptions {
  type: SnippetType;
  name: string;
  registryName: RegistryName;
}

export async function resolveSnippet({
  type,
  name,
  registryName,
}: ResolveRegistryOptions) {
  const spinner = ora("Resolving code...").start();

  // Retrieve the user configuration
  const config = await getConfig();

  // Retrieve the target registry as JSON
  const registry = await getRegistry(registryName);

  // Find the snippet by name and error if not found
  const snippet = registry[name];

  if (!snippet) {
    spinner.fail(`No ${type} found with the name "${name}"!`);
    return null;
  }

  spinner.succeed("Found code!");

  return snippet;
}
