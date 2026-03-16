import "dotenv/config";
import { FuseV1Options, FuseVersion } from "@electron/fuses";
// import type { MakerAppXConfig } from "@electron-forge/maker-appx";
import type { MakerDebConfig } from "@electron-forge/maker-deb";
import type { MakerDMGConfig } from "@electron-forge/maker-dmg";
import type { MakerMSIXConfig } from "@electron-forge/maker-msix";
import type { MakerRpmConfig } from "@electron-forge/maker-rpm";
import type { MakerSquirrelConfig } from "@electron-forge/maker-squirrel";
import type { MakerZIPConfig } from "@electron-forge/maker-zip";
import { FusesPlugin } from "@electron-forge/plugin-fuses";
import type { ForgeConfig } from "@electron-forge/shared-types";
import PACKAGEJSON from "./package.json" with { type: "json" };

const config: ForgeConfig = {
  outDir: "out-electron",
  packagerConfig: {
    asar: true,
    icon: "./src-electron/assets/icon",
    extraResource: ["out"],
    executableName: PACKAGEJSON.name,
    ignore: [
      /node_modules\/@next\/swc-linux-arm64-gnu/,
      /node_modules\/@next\/swc-darwin/,
      /node_modules\/@next\/swc-win32/,
    ],
  },
  rebuildConfig: {},
  makers: [
    {
      name: "@electron-forge/maker-squirrel",
      config: {
        name: "Zero",
        // shortcutName: "Zero",
        // defaultInstallMode: "perUser",
        loadingGif: "./src-electron/assets/loading-gif.gif",
        iconUrl:
          "https://raw.githubusercontent.com/zeroopensource/zero-app/refs/heads/dev/apps/zero-app-v2/src-electron/assets/icon.ico",
        setupIcon: "./src-electron/assets/icon.ico",
        // certificateFile: "./src-electron/cert.pfx",
        // certificatePassword: process.env.CERTIFICATE_PASSWORD,
        // windowsSign: {
        //   // signToolPath: '',
        //   // signWithParams: "",
        //   // certificateFile: "./src-electron/cert.pfx",
        //   // certificatePassword: process.env.CERTIFICATE_PASSWORD,
        //   // signJavaScript: false,
        //   debug: true,
        //   // hookFunction: (fileToSign) => signWinApp(fileToSign),
        // }
      } satisfies MakerSquirrelConfig,
    },
    // {
    //   name: "@electron-forge/maker-appx",
    //   config: {
    //     packageExecutable: `app/${PACKAGEJSON.productName}.exe`,
    //     publisher: "CN=F40B0E04-7AD0-49C9-9D77-44BB51D82F85",
    //     devCert: path.resolve("./src-electron/cert.pfx"),
    //     certPass: process.env.CERTIFICATE_PASSWORD,
    //     makeVersionWinStoreCompatible: true,
    //   } satisfies MakerAppXConfig,
    // },
    {
      name: "@electron-forge/maker-msix",
      config: {
        // logLevel: "debug",
        packageName: `${PACKAGEJSON.productName}-${PACKAGEJSON.version}.msix`,
        sign: false,
        manifestVariables: {
          publisher: "CN=F40B0E04-7AD0-49C9-9D77-44BB51D82F85",
        },
      } satisfies MakerMSIXConfig,
    },
    // {
    //   name: "@electron-forge/maker-wix",
    //   config: {
    //     defaultInstallMode: "perUser",
    //     language: 1033,
    //     manufacturer: "Zero",
    //     // certificateFile: "./src-electron/cert.pfx",
    //     // certificatePassword: process.env.CERTIFICATE_PASSWORD,
    //     icon: "./src-electron/assets/icon.ico",
    //   } satisfies MakerWixConfig,
    // },
    {
      name: "@electron-forge/maker-zip",
      platforms: ["darwin", "linux"],
      config: {} satisfies MakerZIPConfig,
    },
    {
      name: "@electron-forge/maker-deb",
      config: {
        options: {
          name: PACKAGEJSON.productName,
          productName: PACKAGEJSON.productName,
          icon: "./src-electron/assets/icon.png",
          maintainer: "ZeroOpenSource",
          homepage: "https://ZeroOpenSource.org",
        },
      } satisfies MakerDebConfig,
    },
    {
      name: "@electron-forge/maker-dmg",
      config: {
        icon: "./src-electron/assets/icon.icns",
        background: "./src-electron/assets/dmg-background.png",
        format: "ULFO",
      } satisfies MakerDMGConfig,
    },
    {
      name: "@electron-forge/maker-rpm",
      config: {
        options: {
          name: PACKAGEJSON.productName,
          productName: PACKAGEJSON.productName,
          icon: "./src-electron/assets/icon.png",
        },
      } satisfies MakerRpmConfig,
    },
  ],
  plugins: [
    {
      name: "@electron-forge/plugin-auto-unpack-natives",
      config: {},
    },
    // Fuses are used to enable/disable various Electron functionality
    // at package time, before code signing the application
    new FusesPlugin({
      version: FuseVersion.V1,
      [FuseV1Options.RunAsNode]: false,
      [FuseV1Options.EnableCookieEncryption]: true,
      [FuseV1Options.EnableNodeOptionsEnvironmentVariable]: false,
      [FuseV1Options.EnableNodeCliInspectArguments]: false,
      [FuseV1Options.EnableEmbeddedAsarIntegrityValidation]: true,
      [FuseV1Options.OnlyLoadAppFromAsar]: true,
    }),
  ],
  publishers: [
    {
      name: "@electron-forge/publisher-github",
      config: {
        repository: {
          owner: "ZeroOpenSource",
          name: "zero-app",
        },
        generateReleaseNotes: true,
        prerelease: true,
        force: true,
        draft: false,
      },
    },
  ],
};

export default config;
