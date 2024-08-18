import { readFile, writeFile } from "node:fs/promises";

import * as z from "zod";

import { CONFIG_FILENAME } from "./consts.js";
import type { UtilityConfig } from "./types.js";

export const configSchema = z.object({
  ts: z.boolean(),
  aliases: z.object({
    helpers: z.string(),
    hooks: z.string(),
  }),
});

/**
 * Creates a configuration file from the given configuration object
 * @param config - The configuration object to create a file from
 * @returns The configuration file as a string
 */
export function createConfig(config: UtilityConfig): string {
  return JSON.stringify(config, null, 2);
}

/**
 * Writes the configuration to the file system
 * @param config - The configuration to write
 * @returns A promise that resolves when the configuration has been written
 */
export function writeConfig(config: UtilityConfig): Promise<void> {
  return writeFile(CONFIG_FILENAME, createConfig(config));
}

/**
 * Reads the configuration from the file system
 * @returns The configuration object
 */
export async function readConfig(): Promise<UtilityConfig> {
  try {
    const contents = await readFile("utils.json", "utf-8");
    return JSON.parse(contents) as UtilityConfig;
  } catch (e) {
    throw new Error(`Could not find a ${CONFIG_FILENAME} configuration file!`);
  }
}
