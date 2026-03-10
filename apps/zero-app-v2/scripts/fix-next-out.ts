import fs from "node:fs";
import path from "node:path";

const OUT_DIR = path.join(process.cwd(), "out");
if (!(fs.existsSync(OUT_DIR) && fs.statSync(OUT_DIR).isDirectory())) {
  console.error(`Directory not found: ${OUT_DIR}`);
  process.exit(1);
}

const findNextDirs = () => {
  const results = new Set<string>();
  function walk(dir: string) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      if (!entry.isDirectory()) {
        continue;
      }
      const full = path.join(dir, entry.name);
      if (entry.name.startsWith("__next.")) {
        results.add(full);
      }
      walk(full);
    }
  }
  walk(OUT_DIR);
  const found = Array.from(results).sort();
  return found;
};

const findFiles = (dir: string): string[] => {
  const files = fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const p = path.join(dir, e.name);
    return e.isDirectory() ? findFiles(p) : [p];
  });
  return files;
};

const nextDirs = findNextDirs();
for (const nextDir of nextDirs) {
  const basePath = path.basename(nextDir);
  const dirName = path.dirname(nextDir);
  const nextFiles = findFiles(nextDir);
  for (const nextFile of nextFiles) {
    const relative = path.relative(nextDir, nextFile);
    const fileName = `${basePath}\\${relative}`.replaceAll("\\", ".");
    const filePath = `${dirName}\\${fileName}`;
    const normalizedFilePath = path.normalize(filePath);
    console.log("Copying File:", "\n", nextFile, "\n", normalizedFilePath);
    fs.copyFileSync(nextFile, normalizedFilePath);
  }
}
