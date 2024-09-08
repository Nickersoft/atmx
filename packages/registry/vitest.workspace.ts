import { defineWorkspace } from "vitest/config";

const browserTests = [
  "src/actions/**/*.test.ts",
  "src/hooks/browser/*.test.ts",
  "src/hooks/sensors/*.test.ts",
];

export default defineWorkspace([
  {
    extends: "vitest.config.ts",
    test: {
      environment: "jsdom",
      exclude: browserTests,
    },
  },
  // Test hooks and actions in a browser
  {
    extends: "vitest.config.ts",
    test: {
      include: browserTests,
      browser: {
        enabled: true,
        headless: true,
        name: "chromium",
        provider: "playwright",
      },
    },
  },
]);
