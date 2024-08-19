export const IS_DEV = process.env.NODE_ENV === "development";

export const REGISTRY_HOST = IS_DEV
  ? "http://localhost:4321"
  : "https://codedex.dev";

export const SNIPPET_TYPES = ["hook", "helper"] as const;

export const CLI_NAME = `codedex`;
