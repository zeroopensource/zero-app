require("dotenv").config();
const { FusesPlugin } = require("@electron-forge/plugin-fuses");
const { FuseV1Options, FuseVersion } = require("@electron/fuses");

module.exports = {
  outDir: "out-electron",
  packagerConfig: {
    asar: true,
    icon: "./icons/icon",
    extraResource: ["out"],
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
        //   // certificateFile: "./src-electron/cert.pfx",
        //   // certificatePassword: process.env.CERTIFICATE_PASSWORD,
        //   // signJavaScript: true,
        //   // debug: true,
        //   // signToolPath: ''
        //   // hookFunction: (fileToSign) => {},
        // },
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
      platforms: ["darwin"],
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
        },
      },
    },
    // {
    //   name: "@electron-forge/maker-dmg",
    //   config: {
    //     icon: "./icons/icon.icns",
    //   },
    // },
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
};
