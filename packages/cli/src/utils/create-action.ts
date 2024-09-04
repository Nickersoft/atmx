import { exit } from "node:process";

import type { Command } from "commander";

import { clearSpinners } from "@/spinners.js";

function handleError(error: Error) {
  clearSpinners();
  console.error(`❌ ${error.message}`);
  exit(1);
}

interface ActionOptions {
  args: any[];
  cmd: Command;
}

export function createAction(fn: (opts: ActionOptions) => Promise<any>) {
  return (...args: any[]) =>
    fn({
      args: args.slice(0, -1),
      cmd: args[args.length - 1] as Command,
    }).catch(handleError);
}
