import { tmpdir } from "node:os";
import { join } from "node:path";
import { randomBytes } from "node:crypto";
import { existsSync, mkdirSync, writeFileSync } from "node:fs";

import { describe, beforeEach, it, assert, afterEach } from "vitest";

import { empty } from "@/helpers/filesystem/empty.js";
import { rimraf } from "@/helpers/filesystem/rimraf.js";
import { pathExists } from "@/helpers/filesystem/path-exists.js";

describe("removes directories", () => {
  let TEST_DIR: string;

  beforeEach(async () => {
    TEST_DIR = join(tmpdir(), "atmx", "remove-async-dir");
    await empty(TEST_DIR);
  });

  describe("> when the directory does not exist", () => {
    it("should not throw an error", async () => {
      const someDir = join(TEST_DIR, "some-dir/");
      assert.strictEqual(existsSync(someDir), false);
      await rimraf(someDir);
    });
  });
});

let TEST_DIR: string;

function buildFixtureDir() {
  const buf = randomBytes(5);
  const baseDir = join(TEST_DIR, `TEST_fs-extra_remove-${Date.now()}`);

  mkdirSync(baseDir);
  writeFileSync(join(baseDir, Math.random() + ""), buf);
  writeFileSync(join(baseDir, Math.random() + ""), buf);

  const subDir = join(TEST_DIR, Math.random() + "");

  mkdirSync(subDir);
  writeFileSync(join(subDir, Math.random() + ""), buf);

  return baseDir;
}

describe("remove", () => {
  beforeEach(async () => {
    TEST_DIR = join(tmpdir(), "fs-extra", "remove");
    await empty(TEST_DIR);
  });

  afterEach(() => rimraf(TEST_DIR));

  describe("+ remove()", () => {
    it("should delete an empty directory", async () => {
      assert(existsSync(TEST_DIR));
      await rimraf(TEST_DIR);
      assert(!existsSync(TEST_DIR));
    });

    it("should delete a directory full of directories and files", async () => {
      buildFixtureDir();
      assert(existsSync(TEST_DIR));
      await rimraf(TEST_DIR);
      assert(!existsSync(TEST_DIR));
    });

    it("should delete a file", async () => {
      const file = join(TEST_DIR, "file");

      writeFileSync(file, "hello");
      assert(existsSync(file));
      await rimraf(file);
      assert(!existsSync(file));
    });

    it("should delete without a callback", async (done) => {
      const file = join(TEST_DIR, "file");

      writeFileSync(file, "hello");

      assert(existsSync(file));

      let existsChecker = setInterval(async () => {
        const exists = await pathExists(file);
        if (!exists && existsChecker) {
          clearInterval(existsChecker);
        }
      });

      await rimraf(file);
    });

    it("shouldn’t delete glob matches", async ({ skip }) => {
      const file = join(TEST_DIR, "file?");

      try {
        writeFileSync(file, "hello");
      } catch (ex) {
        if ((ex as any).code === "ENOENT") return skip();
        throw ex;
      }

      const wrongFile = join(TEST_DIR, "file1");

      writeFileSync(wrongFile, "yo");

      assert(existsSync(file));
      assert(existsSync(wrongFile));

      await rimraf(file);

      assert(!existsSync(file));
      assert(existsSync(wrongFile));
    });

    it("shouldn’t delete glob matches when file doesn’t exist", async () => {
      const nonexistentFile = join(TEST_DIR, "file?");

      const wrongFile = join(TEST_DIR, "file1");

      writeFileSync(wrongFile, "yo");

      assert(!existsSync(nonexistentFile));
      assert(existsSync(wrongFile));

      await rimraf(nonexistentFile);

      assert(!existsSync(nonexistentFile));
      assert(existsSync(wrongFile));
    });
  });
});
