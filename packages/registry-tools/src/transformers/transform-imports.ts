import { SourceFile } from "ts-morph";

export async function transformImports(
  sourceFile: SourceFile,
  transform: (moduleSpecifier: string) => string,
  filter: (moduleSpecifier: string) => boolean = () => true,
): Promise<SourceFile> {
  const importDeclarations = sourceFile.getImportDeclarations();

  for (const importDeclaration of importDeclarations) {
    const moduleSpecifier = importDeclaration.getModuleSpecifierValue();

    if (!filter(moduleSpecifier)) {
      continue;
    }

    const newValue = transform(moduleSpecifier);

    importDeclaration.setModuleSpecifier(newValue);
  }

  return sourceFile;
}
