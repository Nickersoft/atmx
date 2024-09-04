import ora, { type Ora, type Options as OraOptions } from "ora";

let spinnerRegistry: Ora[] = [];

export function createSpinner(options: string | OraOptions = {}) {
  spinnerRegistry.push(ora(options));
  return spinnerRegistry[spinnerRegistry.length - 1];
}

export function clearSpinners() {
  spinnerRegistry.forEach((spinner) => spinner.clear());
  spinnerRegistry = [];
}
