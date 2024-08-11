import "core-js/features/object/group-by";

export async function getSnippets() {
  const files = await import.meta.glob("../snippets/**/*.ts", {
    query: "?raw",
  });

  const objs = await Promise.all(
    Object.entries(files).map(async ([path, content]) => {
      const [, , section, category, name] = path.split("/");
      return {
        section,
        category,
        name: name.replace(".ts", ""),
        content: content(),
      };
    }),
  );

  return Object.fromEntries(
    Object.entries(Object.groupBy(objs, (x) => x.section)).map(
      ([section, value]) => [
        section,
        Object.entries(Object.groupBy(value ?? [], (x) => x.category)).map(
          ([category, snippets]) => ({
            section,
            category,
            snippets: snippets!.map((x) => ({
              name: x.name,
              content: x.content,
            })),
          }),
        ),
      ],
    ),
  );
}

export function transformCode(code: string) {
  return code.replaceAll(/snippets\/(.+?)\/.+?\/(.+?)/g, "helpers/$2");
}
