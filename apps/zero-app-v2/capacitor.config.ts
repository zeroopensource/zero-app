import type { CapacitorConfig } from "@capacitor/cli";
import "dotenv/config";

import path from "node:path";

const keystorePath = process.env.KEYSTORE_PATH
  ? path.resolve(process.env.KEYSTORE_PATH)
  : undefined;

const config: CapacitorConfig = {
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
      keystorePath,
      keystorePassword: process.env.KEYSTORE_PASSWORD,
      keystoreAlias: process.env.KEYSTORE_ALIAS,
      keystoreAliasPassword: process.env.KEYSTORE_PASSWORD,
    },
  },
};

export default config;
