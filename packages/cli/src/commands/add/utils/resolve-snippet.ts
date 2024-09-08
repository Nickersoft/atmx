import {
  getRegistry,
  type RegistryName,
  type SnippetType,
} from "@atmx-org/common";
import { createSpinner } from "@/spinners.ts";

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
  const spinner = createSpinner("Resolving code...").start();

  // Retrieve the target registry as JSON
  const registry = await getRegistry(registryName);

  // Find the snippet by name and error if not found
  const snippet = registry[name];

  if (!snippet) {
    throw new Error(`No ${type} found with the name "${name}"!`);
  }

  spinner.stop();

  return snippet;
}
