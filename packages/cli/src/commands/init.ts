import { existsSync } from "node:fs";

import { Command } from "commander";
import { input, select } from "@inquirer/prompts";

import { writeConfig } from "@/config.js";

async function init() {
  const hasTSConfig = existsSync("tsconfig.json");

  const ts =
    hasTSConfig ||
    (await select({
      message: "Would you like to use TypeScript?",
      choices: [
        { name: "Yes", value: true },
        { name: "No", value: false },
      ],
    }));

  const helpers = await input({
    message: "What alias would you like to use for helper functions?",
    default: "@/lib/helpers",
  });

  const hooks = await input({
    message: "What alias would you like to use for React hooks (if using)?",
    default: "@/lib/hooks",
  });

  await writeConfig({
    ts,
    aliases: {
      helpers,
      hooks,
    },
  });
}

export default new Command("init").action(init);
