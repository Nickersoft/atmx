import { tmpdir } from "node:os";
import { join } from "node:path";
import { randomBytes } from "node:crypto";
import { existsSync, mkdirSync, writeFileSync } from "node:fs";

import { describe, beforeEach, it, expect, afterEach } from "bun:test";

import { empty } from "@/helpers/filesystem/empty.ts";
import { rimraf } from "@/helpers/filesystem/rimraf.ts";
import { pathExists } from "@/helpers/filesystem/path-exists.ts";

describe("removes directories", () => {
  let TEST_DIR: string;

  beforeEach(async () => {
    TEST_DIR = join(tmpdir(), "atmx", "remove-async-dir");
    await empty(TEST_DIR);
  });

  describe("> when the directory does not exist", () => {
    it("should not throw an error", async () => {
      const someDir = join(TEST_DIR, "some-dir/");
      expect(existsSync(someDir)).toStrictEqual(false);
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
      expect(existsSync(TEST_DIR)).toBeTrue();
      await rimraf(TEST_DIR);
      expect(existsSync(TEST_DIR)).toBeFalse();
    });

    it("should delete a directory full of directories and files", async () => {
      buildFixtureDir();
      expect(existsSync(TEST_DIR)).toBeTrue();
      await rimraf(TEST_DIR);
      expect(existsSync(TEST_DIR)).toBeFalse();
    });

    it("should delete a file", async () => {
      const file = join(TEST_DIR, "file");

      writeFileSync(file, "hello");
      expect(existsSync(file)).toBeTrue();
      await rimraf(file);
      expect(existsSync(file)).toBeFalse();
    });

    it("should delete without a callback", async () => {
      const file = join(TEST_DIR, "file");

      writeFileSync(file, "hello");

      expect(existsSync(file)).toBeTrue();

      let existsChecker = setInterval(async () => {
        const exists = await pathExists(file);
        if (!exists && existsChecker) {
          clearInterval(existsChecker);
        }
      });

      await rimraf(file);
    });

    it("shouldn’t delete glob matches", async () => {
      const file = join(TEST_DIR, "file?");

      try {
        writeFileSync(file, "hello");
      } catch (ex) {
        throw ex;
      }

      const wrongFile = join(TEST_DIR, "file1");

      writeFileSync(wrongFile, "yo");

      expect(existsSync(file)).toBeTrue();
      expect(existsSync(wrongFile)).toBeTrue();

      await rimraf(file);

      expect(existsSync(file)).toBeFalse();
      expect(existsSync(wrongFile)).toBeTrue();
    });

    it("shouldn’t delete glob matches when file doesn’t exist", async () => {
      const nonexistentFile = join(TEST_DIR, "file?");

      const wrongFile = join(TEST_DIR, "file1");

      writeFileSync(wrongFile, "yo");

      expect(existsSync(nonexistentFile)).toBeFalse();
      expect(existsSync(wrongFile)).toBeTrue();

      await rimraf(nonexistentFile);

      expect(existsSync(nonexistentFile)).toBeFalse();
      expect(existsSync(wrongFile)).toBeTrue();
    });
  });
});
