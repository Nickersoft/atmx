import { writeFile } from "node:fs/promises";

import { Command } from "commander";
import { input, select } from "@inquirer/prompts";

import { isTypescriptProject } from "@/utils/is-typescript-project.js";
import type { GlobalOptions } from "@/types.js";
import { CONFIG_FILE_NAME } from "@/config/consts.js";

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
    message: "What alias would you like to use for React hooks (if using)?",
    default: "@/lib/hooks",
  });

  const config = {
    ts,
    aliases: {
      helpers,
      hooks,
    },
  };

  await writeFile(CONFIG_FILE_NAME, JSON.stringify(config, null, 2));
}

export default new Command("init").action(init);
