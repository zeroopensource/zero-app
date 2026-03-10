import "dotenv/config";
import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const sdk = process.env.ANDROID_HOME || process.env.ANDROID_SDK_ROOT;

if (!sdk) {
  throw new Error("ANDROID_HOME or ANDROID_SDK_ROOT not set");
}

const buildTools = path.join(sdk, "build-tools");
const versions = fs.readdirSync(buildTools).sort().reverse();
const apksigner = path.join(buildTools, versions[0], "apksigner.bat");

console.log("Using apksigner:", apksigner);

const result = spawnSync(
  apksigner,
  [
    "sign",
    "--ks",
    process.env.KEYSTORE_PATH,
    "--ks-key-alias",
    process.env.KEYSTORE_ALIAS,
    "--ks-pass",
    "env:KEYSTORE_PASSWORD",
    "--key-pass",
    "env:KEYSTORE_PASSWORD",
    "--out",
    "./android/app/build/outputs/apk/release/app-release-resigned.apk",
    "./android/app/build/outputs/apk/release/app-release-aligned.apk",
  ],
  { stdio: "inherit", shell: true }
);

if (result.error) {
  console.error("Failed to run apksigner:", result.error);
  process.exit(1);
}
