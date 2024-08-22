export const IS_DEV = process.env.NODE_ENV !== "production";

export const REGISTRY_HOST = IS_DEV
  ? "http://localhost:4321"
  : "https://atmx.dev";

export const SNIPPET_TYPES = ["hook", "helper"] as const;

export const CLI_NAME = `atmx`;
