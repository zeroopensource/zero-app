require("dotenv").config();
const { FusesPlugin } = require("@electron-forge/plugin-fuses");
const { FuseV1Options, FuseVersion } = require("@electron/fuses");
const packageJson = require("./package.json");

module.exports = {
  outDir: "out-electron",
  packagerConfig: {
    asar: true,
    icon: "./icons/icon",
    extraResource: ["out"],
    executableName: packageJson.name,
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
          name: "zeroopensource/zero-app",
        },
        prerelease: true,
      },
    },
  ],
};
