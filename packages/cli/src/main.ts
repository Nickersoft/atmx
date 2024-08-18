import { Command } from "commander";

import add from "./commands/add.js";
import init from "./commands/init.js";

const program = new Command();

program.addCommand(init);
program.addCommand(add);
program.parse();
