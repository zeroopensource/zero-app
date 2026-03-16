#!/usr/bin/env node

import "dotenv/config";
import fs from "node:fs/promises";
import path from "node:path";
import { sign } from "@electron/windows-sign";

const appDir = "./out-electron";
const certFile = "./src-electron/cert.pfx";
const tempDir = path.join("temp");
const EXCLUDED_EXT = new Set([".node"]);
const publicCerUrl =
  "https://github.com/zeroopensource/zero-official/raw/refs/heads/main/packages/zero-official/src/certificates/zero-code-signing-E656BCE2.cer";

async function downloadCer() {
  console.log("Downloading Cer...");
  const res = await fetch(publicCerUrl);
  const filename = path.basename(new URL(publicCerUrl).pathname);
  const extrasDir = path.join(appDir, "extras");
  const dest = path.join(extrasDir, filename);
  await fs.mkdir(extrasDir, { recursive: true });
  await fs.writeFile(dest, Buffer.from(await res.arrayBuffer()));
  console.log("Saved public cert →", dest);
}

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
  await downloadCer();
  console.log("Preparing files for signing...");
  await fs.mkdir(tempDir, { recursive: true });
  const moved = await moveExcluded();
  console.log(`Temporarily moved ${moved.length} excluded files`);
  console.log("Signing directory:", appDir);
  await sign({
    appDirectory: path.resolve(appDir),
    certificateFile: path.resolve(certFile),
    certificatePassword: process.env.WINDOWS_CERTIFICATE_PASSWORD,
    debug: true,
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
