// require("dotenv").config();
// const { FusesPlugin } = require("@electron-forge/plugin-fuses");
// const { FuseV1Options, FuseVersion } = require("@electron/fuses");
const packageJson = require("./package.json");
import "dotenv/config";
import { FuseV1Options, FuseVersion } from "@electron/fuses";
import { FusesPlugin } from "@electron-forge/plugin-fuses";
import type { ForgeConfig } from "@electron-forge/shared-types";

const config: ForgeConfig = {
  outDir: "out-electron",
  packagerConfig: {
    asar: true,
    icon: "./icons/icon",
    extraResource: ["out"],
    executableName: packageJson.name,
  },
  rebuildConfig: {},
  makers: [
    {
      name: "@electron-forge/maker-squirrel",
      config: {
        name: "Zero",
        shortcutName: "Zero",
        defaultInstallMode: "perUser",
        loadingGif: "./icons/loading-gif.gif",
        iconUrl:
          "https://raw.githubusercontent.com/zeroopensource/zero-app/refs/heads/dev/apps/zero-app-v2/icons/icon.ico",
        setupIcon: "./icons/icon.ico",
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
      },
    },
    // {
    //   name: "@electron-forge/maker-wix",
    //   config: {
    //     defaultInstallMode: "perUser",
    //     language: 1033,
    //     manufacturer: "Zero",
    //     // certificateFile: "./src-electron/cert.pfx",
    //     // certificatePassword: process.env.CERTIFICATE_PASSWORD,
    //     icon: "./icons/icon.ico",
    //   },
    // },
    {
      name: "@electron-forge/maker-zip",
      platforms: ["darwin", "linux"],
      config: {
        options: {
          icon: "./icons/icon.png",
        },
      },
    },
    {
      name: "@electron-forge/maker-deb",
      config: {
        options: {
          icon: "./icons/icon.png",
          maintainer: "ZeroOpenSource",
          homepage: "https://ZeroOpenSource.org",
        },
      },
    },
    {
      name: "@electron-forge/maker-dmg",
      config: {
        icon: "./icons/icon.icns",
        background: "./src-electron/assets/dmg-background.png",
        format: "ULFO",
      },
    },
    {
      name: "@electron-forge/maker-rpm",
      config: {
        icon: "./icons/icon.png",
      },
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
