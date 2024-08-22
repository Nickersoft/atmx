import { REGISTRY_HOST } from "@/consts.js";

import type { RegistryName, Snippet, SnippetType } from "@/types.js";
import { scoped } from "./scoped.js";

export const getRegistry = scoped(() => {
  const registryCache = new Map<RegistryName, Record<string, Snippet>>();

  return async function (name: RegistryName): Promise<Record<string, Snippet>> {
    if (registryCache.has(name)) {
      return registryCache.get(name)!;
    }

    const url = new URL(`/registry/${name}.json`, REGISTRY_HOST);
    console.log(url);
    try {
      const registry = await fetch(url).then((res) => res.json());
      registryCache.set(name, registry);
      return registry;
    } catch (e) {
      throw new Error(`Failed to fetch registry from ${url.toString()}: ${e}`);
    }
  };
});

export function getRegistryName(type: SnippetType): RegistryName {
  return `${type}s`;
}
