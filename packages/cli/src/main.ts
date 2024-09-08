#!/usr/bin/env node

import { Command } from "commander";

import add from "./commands/add/command.ts";
import init from "./commands/init.ts";

const program = new Command()
  .option(
    "-c, --cwd <cwd>",
    "the working directory. defaults to the current directory.",
    process.cwd(),
  )
  .option("-d, --debug", "display stack traces on error", false);

program.addCommand(init);
program.addCommand(add);

program.parse();
