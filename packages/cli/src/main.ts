#!/usr/bin/env node

import { Command } from "commander";

import add from "./commands/add.js";
import init from "./commands/init.js";

const program = new Command().option(
  "-c, --cwd <cwd>",
  "the working directory. defaults to the current directory.",
  process.cwd(),
);

program.addCommand(init);
program.addCommand(add);

program.parse();
