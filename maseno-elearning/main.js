const { app, BrowserWindow } = require('electron');
const path = require('path');

let mainWindow;
let splashWindow;

function createMainWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    }
  });

  mainWindow.loadURL('https://elearning.maseno.ac.ke');

  mainWindow.once('ready-to-show', () => {
    splashWindow.close();
    mainWindow.show();
  });
}

function createSplashWindow() {
  splashWindow = new BrowserWindow({
    width: 400,
    height: 400,
    frame: false,
    alwaysOnTop: true,
    transparent: true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    }
  });

  splashWindow.loadFile('splash.html');
  splashWindow.show();
}

app.whenReady().then(() => {
  createSplashWindow();

  setTimeout(() => {
    createMainWindow();
  }, 3000);
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createMainWindow();
  }
});
