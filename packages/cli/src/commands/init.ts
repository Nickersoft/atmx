import { writeFile } from "node:fs/promises";

import { Command } from "commander";
import { input, select } from "@inquirer/prompts";

import { REGISTRY_HOST, type Config } from "@atmx-org/common";

import {
  isReactProject,
  isSvelteProject,
  isTypescriptProject,
} from "@/utils/environment.ts";
import type { GlobalOptions } from "@/types.ts";
import { CONFIG_FILE_NAME } from "@/config/consts.ts";

interface InitOptions extends GlobalOptions {}

async function init(options: InitOptions) {
  let ts = await isTypescriptProject(options.cwd);
  let types = "@/lib/types";
  let actions = "@/lib/actions";
  let hooks = "@/lib/hooks";

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

  if (await isReactProject(options.cwd)) {
    hooks = await input({
      message: "What alias would you like to use for React hooks?",
      default: hooks,
    });
  }

  if (await isSvelteProject(options.cwd)) {
    actions = await input({
      message: "What alias would you like to use for Svelte actions?",
      default: actions,
    });
  }

  if (ts) {
    types = await input({
      message: "What alias would you like to use for utility types?",
      default: types,
    });
  }

  const index = await select({
    message: "Would you like to export all methods via an index file?",
    choices: [
      { name: "Yes", value: true },
      { name: "No", value: false },
    ],
    default: false,
  });

  const config: Config = {
    ts,
    index,
    aliases: {
      helpers,
      hooks,
      types,
      actions,
    },
  };

  await writeFile(
    CONFIG_FILE_NAME,
    JSON.stringify(
      {
        $schema: `${REGISTRY_HOST}/schema.json`,
        ...config,
      },
      null,
      2,
    ),
  );

  console.log("\n✅ utils.json created successfully!");
}

export default new Command("init").action(init);
