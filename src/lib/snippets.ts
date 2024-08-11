export function transformCode(code: string) {
  return code.replaceAll(/snippets\/(.+?)\/.+?\/(.+?)/g, "helpers/$2");
}
