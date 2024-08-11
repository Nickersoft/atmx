const capitalize = '/* Capitalizes the first word of the string */\nexport function capitalize(str: string): string {\n  if (!str || str.length === 0) return "";\n  const lower = str.toLowerCase();\n  return lower.substring(0, 1).toUpperCase() + lower.substring(1, lower.length);\n}\n';

export { capitalize as default };
