
import { defineConfig } from "vitest/config";

import paths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [paths()],
  test: {
    environment: "happy-dom",
  },
});