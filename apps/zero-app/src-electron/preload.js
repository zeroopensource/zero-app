const { contextBridge } = require("electron");

contextBridge.exposeInMainWorld("electronApi", {
  isElectron: true,
  electronPlatform: process.platform,
  electronVersion: process.versions.electron,
});
