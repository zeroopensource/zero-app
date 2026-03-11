import type { CapacitorConfig } from "@capacitor/cli";
import "dotenv/config";
import path from "node:path";

let config: CapacitorConfig;
const baseConfig: CapacitorConfig = {
  appId: "org.zeroopensource.zeroapp",
  appName: "Zero",
  webDir: "out",
  backgroundColor: "#09090B",
  android: {
    buildOptions: {
      // Use APK-apksigner AAB-jarsigner
      // releaseType: "APK",
      // signingType: "apksigner",
      // releaseType: "AAB",
      // signingType: "jarsigner",
      keystorePath: path.resolve("./src-capacitor/upload-keystore.jks"),
      keystorePassword: process.env.KEYSTORE_PASSWORD,
      keystoreAlias: "upload",
      keystoreAliasPassword: process.env.KEYSTORE_PASSWORD,
    },
  },
};

switch (process.env.RELEASE_TYPE) {
  case "APK":
    config = {
      ...baseConfig,
      android: {
        ...baseConfig.android,
        buildOptions: {
          ...baseConfig.android?.buildOptions,
          releaseType: "APK",
          signingType: "apksigner",
        },
      },
    };
    break;
  case "AAB":
    config = {
      ...baseConfig,
      android: {
        ...baseConfig.android,
        buildOptions: {
          ...baseConfig.android?.buildOptions,
          releaseType: "AAB",
          signingType: "jarsigner",
        },
      },
    };
    break;
  default:
    config = {
      ...baseConfig,
    };
    break;
}

console.log("KEYSTORE_PASSWORD", process.env.KEYSTORE_PASSWORD);
console.log("config", config);
console.log("process.env", process.env);

export default config;
