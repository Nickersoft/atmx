export async function getSnippets() {
  const files = await import.meta.glob("../snippets/**/*.ts", {
    query: "?raw",
  });

  const objs = await Promise.all(
    Object.entries(files).map(async ([path, content]) => {
      const [, , section, name] = path.split("/");
      return { section, name: name.replace(".ts", ""), content: content() };
    }),
  );

  return Object.groupBy(objs, (x) => x.section);
}
