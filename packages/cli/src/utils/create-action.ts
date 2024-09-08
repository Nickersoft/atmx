import { exit } from "node:process";

import type { Command } from "commander";

import { clearSpinners } from "@/spinners.ts";

function handleError(error: Error, debug?: boolean) {
  if (debug) throw error;
  clearSpinners();
  console.error(`❌ ${error.message}`);
  exit(1);
}

interface ActionOptions {
  args: any[];
  cmd: Command;
}

export function createAction(fn: (opts: ActionOptions) => Promise<any>) {
  return (...args_: any[]) => {
    const args = args_.slice(0, -1);
    const cmd = args_[args_.length - 1] as Command;
    fn({ args, cmd }).catch((e) => handleError(e, cmd.optsWithGlobals().debug));
  };
}
