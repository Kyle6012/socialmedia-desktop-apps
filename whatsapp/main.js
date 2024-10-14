const { app, BrowserWindow } = require('electron');
const path = require('path');

let mainWindow;
let splashWindow;

// Create the main WhatsApp window
function createMainWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    }
  });

  // Load WhatsApp Web
  mainWindow.loadFile('index.html');

  // Close splash window and show the main window when ready
  mainWindow.once('ready-to-show', () => {
    splashWindow.close();
    mainWindow.show();
  });
}

// Create the splash window
function createSplashWindow() {
  splashWindow = new BrowserWindow({
    width: 400,
    height: 300,
    frame: false,
    alwaysOnTop: true,
    transparent: true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    }
  });

  // Load the splash screen HTML
  splashWindow.loadFile('splash.html');
  splashWindow.show();
}

// Handle app startup
app.whenReady().then(() => {
  createSplashWindow();

  // Simulate a delay for the splash screen (e.g., 3 seconds)
  setTimeout(() => {
    createMainWindow();
  }, 3000);
});

// Quit the app when all windows are closed
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
