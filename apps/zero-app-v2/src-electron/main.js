const { app, BrowserWindow, nativeImage } = require("electron");
const serve = require("electron-serve");
const path = require("node:path");

const appServe = app.isPackaged
  ? serve({
      directory: path.join(__dirname, "../out"),
    })
  : null;

const createWindow = () => {
  const win = new BrowserWindow({
    icon: path.join(__dirname, "../public/zero-logo-v1-padding.ico"),
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  // const iconPath = path.join(__dirname, "../public/zero-logo-v1-padding.png");
  // const iconImage = nativeImage.createFromPath(iconPath);
  // win.setIcon(iconImage);

  if (app.isPackaged) {
    appServe(win).then(() => {
      win.loadURL("app://-");
    });
  } else {
    win.loadURL(`http://localhost:${process.env.PORT || 4122}`);
    win.webContents.openDevTools();
    win.webContents.on(
      "did-fail-load",
      (
        // e,
        // code,
        // desc
      ) => {
        win.webContents.reloadIgnoringCache();
      }
    );
  }
};

app.on("ready", () => {
  createWindow();
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
