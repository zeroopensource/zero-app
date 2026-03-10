import type { CapacitorConfig } from "@capacitor/cli";
import "dotenv/config";

const config: CapacitorConfig = {
  appId: "org.zeroopensource.zeroapp",
  appName: "Zero",
  webDir: "out",
  backgroundColor: "#09090B",
  android: {
    buildOptions: {
      // releaseType: "APK",
      // signingType: "apksigner",
      releaseType: "AAB",
      signingType: "jarsigner",
      keystorePath: process.env.KEYSTORE_PATH,
      keystorePassword: process.env.KEYSTORE_PASSWORD,
      keystoreAlias: process.env.KEYSTORE_ALIAS,
      keystoreAliasPassword: process.env.KEYSTORE_PASSWORD,
    },
  },
};

export default config;
