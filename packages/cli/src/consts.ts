export const CONFIG_FILENAME = "utils.json";

export const IS_DEV = process.env.NODE_ENV === "development";

export const REGISTRY_HOST = IS_DEV
  ? "http://localhost:4321"
  : "https://codedex.dev";

export const UTILITY_TYPES = ["hook", "helper"] as const;
