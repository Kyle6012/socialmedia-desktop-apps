const { app, BrowserWindow } = require('electron');
const path = require('path');

let mainWindow;
let splashWindow;

function createMainWindow() {
    mainWindow = new BrowserWindow({
        width: 1000,
        height: 800,
        WebPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        }
    });

    mainWindpw.loadFile("index.html");

    mainWindow.once('ready-to-show', () => {
        splashWindow.close();
        mainWindow.show();
    });
}

function createSplashWindow(){
    splashWindow = new BrowserWindow({
        width: 400,
        height: 300,
        frame: false,
        alwaysOnTop: true,
        transparent: true,
        WebPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        }
    });

    splashWindow.loadFile("splash.html");
    splashWindow.show();
}

app.whenReady().then(() => {
    createSplashWindow();

    setTimeout(() => {
        createMainWindow();
    }, 2000);
});

app.on('activate', () => {
    if (process.platform !== 'darwin'){
        app.quit();
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createMainWindow();
    }
});