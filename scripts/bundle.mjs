import { readFileSync, writeFileSync } from "node:fs";
import { dirname, relative, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const entry = resolve(root, "src/main.js");
const output = resolve(root, "app.js");
const importPattern = /^import\s+[\s\S]*?\s+from\s+["']([^"']+)["'];\s*$/gm;

export function bundle() {
  const visited = new Set();
  const modules = [];

  function visit(filePath) {
    if (visited.has(filePath)) return;
    visited.add(filePath);

    const source = readFileSync(filePath, "utf8");
    const imports = [...source.matchAll(importPattern)];
    for (const match of imports) {
      if (!match[1].startsWith(".")) throw new Error(`Unsupported browser import in ${filePath}: ${match[1]}`);
      visit(resolve(dirname(filePath), match[1]));
    }

    const body = source
      .replace(importPattern, "")
      .replace(/^export\s+/gm, "");
    modules.push(`// ${relative(root, filePath)}\n${body.trim()}\n`);
  }

  visit(entry);
  const banner = `/* Target Alpha Canada — generated browser bundle. Edit src/, then run npm run build. */\n(() => {\n"use strict";\n`;
  writeFileSync(output, `${banner}${modules.join("\n")}\n})();\n`);
  return output;
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  bundle();
  console.log("Bundled app.js");
}
