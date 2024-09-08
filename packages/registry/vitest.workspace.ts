import { defineWorkspace } from "vitest/config";

export default defineWorkspace([
  {
    extends: "vitest.config.ts",
    test: {
      environment: "jsdom",
      exclude: [
        "src/actions/**/*.test.ts",
        "src/hooks/dom/*.test.ts",
        "src/hooks/sensors/*.test.ts",
      ],
    },
  },
  // Test hooks and actions in a browser
  {
    extends: "vitest.config.ts",
    test: {
      include: [
        "src/actions/**/*.test.ts",
        "src/hooks/dom/*.test.ts",
        "src/hooks/sensors/*.test.ts",
      ],
      browser: {
        enabled: true,
        headless: true,
        name: "chromium",
        provider: "playwright",
      },
    },
  },
]);
