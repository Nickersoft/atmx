/**
 * Taken from
 * https://github.com/npm/package-json/blob/main/lib/read-package.js
 */

import { readFile } from "node:fs/promises";

async function read(filename: string) {
  try {
    const data = await readFile(filename, "utf8");
    return data;
  } catch (err) {
    (err as Error).message = `Could not read package.json: ${err}`;
    throw err;
  }
}

function parse(data: string) {
  try {
    const content = JSON.parse(data);
    return content;
  } catch (err) {
    (err as Error).message = `Invalid package.json: ${err}`;
    throw err;
  }
}

async function readPackage(filename: string) {
  const data = await read(filename);
  return parse(data);
}

export { read, parse, readPackage };
