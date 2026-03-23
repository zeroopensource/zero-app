const { contextBridge } = require("electron");

/* file:///./electron-env.d.ts */
contextBridge.exposeInMainWorld("electronApi", {
  isElectron: true,
  electronPlatform: process.platform,
  electronVersion: process.versions.electron,
});
