import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  dts: true,
  format: ["esm", "cjs"],
  target: "esnext",
  minify: process.env.NODE_ENV !== "development",
  sourcemap: true,
  clean: true,
  outDir: "dist",
});
