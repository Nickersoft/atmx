import { defineWorkspace } from "vitest/config";

export default defineWorkspace([
  {
    extends: "vitest.config.ts",
    test: {
      exclude: ["src/actions/**/*.test.ts", "src/hooks/**/*.test.ts"],
    },
  },
  // Test hooks and actions in a browser
  {
    extends: "vitest.config.ts",
    test: {
      include: ["src/actions/**/*.test.ts", "src/hooks/**/*.test.ts"],
      browser: {
        enabled: true,
        headless: true,
        name: "chromium",
        provider: "playwright",
      },
    },
  },
]);
