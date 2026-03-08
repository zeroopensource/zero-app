#!/usr/bin/env node

import "dotenv/config";
import fs from "node:fs/promises";
import path from "node:path";
import { sign } from "@electron/windows-sign";

const appDir = "./out-electron";
const certFile = "./src-electron/cert.pfx";
const tempDir = path.join("temp");

const EXCLUDED_EXT = new Set([".node"]);

async function walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await walk(full)));
    } else {
      files.push(full);
    }
  }
  return files;
}

async function moveExcluded() {
  const moved = [];
  const files = await walk(appDir);
  for (const file of files) {
    const ext = path.extname(file).toLowerCase();
    if (EXCLUDED_EXT.has(ext)) {
      const relative = path.relative(appDir, file);
      const dest = path.join(tempDir, relative);
      await fs.mkdir(path.dirname(dest), { recursive: true });
      await fs.rename(file, dest);
      moved.push({ original: file, temp: dest });
    }
  }
  return moved;
}

async function restoreFiles(moved) {
  for (const file of moved) {
    await fs.mkdir(path.dirname(file.original), { recursive: true });
    await fs.rename(file.temp, file.original);
  }
}

async function run() {
  console.log("Preparing files for signing...");
  await fs.mkdir(tempDir, { recursive: true });
  const moved = await moveExcluded();
  console.log(`Temporarily moved ${moved.length} excluded files`);
  console.log("Signing directory:", appDir);
  await sign({
    appDirectory: path.resolve(appDir),
    certificateFile: path.resolve(certFile),
    certificatePassword: process.env.WINDOWS_CERTIFICATE_PASSWORD,
  });
  console.log("Restoring files...");
  await restoreFiles(moved);
  await fs.rm(tempDir, { recursive: true, force: true });
  console.log("Signing complete");
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
