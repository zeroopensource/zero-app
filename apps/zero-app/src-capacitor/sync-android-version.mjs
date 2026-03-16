import fs from "node:fs/promises";
import path from "node:path";

const pkgPath = path.resolve("package.json");
const gradlePath = path.resolve("android/app/build.gradle");

const pkg = JSON.parse(await fs.readFile(pkgPath, "utf8"));
const version = pkg.version;

// enforce strict semver: x.y.z
if (!/^\d+\.\d+\.\d+$/.test(version)) {
  throw new Error(
    `Invalid version "${version}". Expected format: major.minor.patch`
  );
}

const [major, minor, patch] = version.split(".").map(Number);

// enforce 2-digit limit
if (minor >= 100 || patch >= 100) {
  throw new Error(
    `Android versionCode scheme only supports minor/patch < 100. Received: ${version}`
  );
}

const versionCode = major * 10000 + minor * 100 + patch;

let gradle = await fs.readFile(gradlePath, "utf8");

gradle = gradle.replace(/versionCode\s+\d+/, `versionCode ${versionCode}`);
gradle = gradle.replace(/versionName\s+"[^"]+"/, `versionName "${version}"`);

await fs.writeFile(gradlePath, gradle);

console.log("Android version synced:");
console.log("versionName:", version);
console.log("versionCode:", versionCode);