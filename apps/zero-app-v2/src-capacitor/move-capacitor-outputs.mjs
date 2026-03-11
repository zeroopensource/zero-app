import fs from "node:fs/promises";
import path from "node:path";

const root = process.cwd();

const pkg = JSON.parse(
  await fs.readFile(path.join(root, "package.json"), "utf8")
);

const productName = pkg.productName;
const version = pkg.version;

const outDir = path.join(root, "out-capacitor");

const files = [
  {
    src: "./android/app/build/outputs/bundle/release/app-release-signed.aab",
    ext: "aab",
  },
  {
    src: "./android/app/build/outputs/apk/release/app-release-signed.apk",
    ext: "apk",
  },
];

await fs.rm(outDir, { recursive: true, force: true });
await fs.mkdir(outDir, { recursive: true });

for (const file of files) {
  const srcPath = path.join(root, file.src);
  const destPath = path.join(outDir, `${productName}-v${version}.${file.ext}`);

  await fs.copyFile(srcPath, destPath);

  console.log(`Copied ${srcPath} -> ${destPath}`);
}
