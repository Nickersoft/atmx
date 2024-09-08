"use strict";
/**
 * Adapted from
 * https://github.com/jprichardson/node-fs-extra/blob/master/lib/path-exists/__tests__/path-exists.test.js
 */

import { join } from "node:path";

import { beforeEach, afterEach, it, describe, expect } from "bun:test";
import { tmpdir } from "node:os";

import { rimraf } from "@/helpers/filesystem/rimraf.ts";
import { empty } from "@/helpers/filesystem/empty.ts";
import { pathExists } from "@/helpers/filesystem/path-exists.ts";
import { ensureFile } from "./ensure-file.ts";

describe("pathExists()", () => {
  let TEST_DIR: string;

  beforeEach(async () => {
    TEST_DIR = join(tmpdir(), "atmx", "path-exists");
    await empty(TEST_DIR);
  });

  afterEach(() => rimraf(TEST_DIR));

  it("should return false if file does not exist", () => {
    return pathExists(join(TEST_DIR, "somefile")).then((exists) =>
      expect(exists).toBe(false),
    );
  });

  it("should return true if file does exist", async () => {
    const file = join(TEST_DIR, "exists");
    await ensureFile(file);
    return pathExists(file).then((exists) => expect(exists).toBe(true));
  });
});
