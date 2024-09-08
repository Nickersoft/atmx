import { writeFile } from "node:fs/promises";

import { Command } from "commander";
import { input, select } from "@inquirer/prompts";

import type { Config } from "@atmx-org/common";

import { isTypescriptProject } from "@/utils/is-typescript-project.ts";
import type { GlobalOptions } from "@/types.ts";
import { CONFIG_FILE_NAME } from "@/config/consts.ts";

interface InitOptions extends GlobalOptions {}

async function init(options: InitOptions) {
  let ts = await isTypescriptProject(options.cwd);

  if (!ts) {
    ts = await select({
      message: "Would you like to use TypeScript?",
      choices: [
        { name: "Yes", value: true },
        { name: "No", value: false },
      ],
    });
  }

  const helpers = await input({
    message: "What alias would you like to use for helper functions?",
    default: "@/lib/helpers",
  });

  const hooks = await input({
    message: "What alias would you like to use for React hooks?",
    default: "@/lib/hooks",
  });

  const actions = await input({
    message: "What alias would you like to use for Svelte actions?",
    default: "@/lib/actions",
  });

  const types = await input({
    message: "What alias would you like to use for utility types?",
    default: "@/lib/types",
  });

  const config: Config = {
    ts,
    aliases: {
      helpers,
      hooks,
      types,
      actions,
    },
  };

  await writeFile(CONFIG_FILE_NAME, JSON.stringify(config, null, 2));

  console.log("\n✅ utils.json created successfully!");
}

export default new Command("init").action(init);
