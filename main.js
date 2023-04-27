const electron = require('electron');
const BrowserWindow = electron.BrowserWindow;
const app = electron.app;
const path = require('path');
let mainWindow;
const ipc = electron.ipcMain;
const isMac = process.platform === 'darwin';

//process.env.NODE_ENV !== 'production' // Set to production to exit dev more
const isDev = process.env.NODE_ENV !== 'production'



function createWindow() {
  mainWindow = new BrowserWindow({
    width: isDev ? 1200 : 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js')
    }
  })
  mainWindow.loadFile('index.html')
  // opens devtools
  if(isDev)
    mainWindow.webContents.openDevTools();
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })


  ipc.on('login-success', () => {
    console.log('login ipc received');
    mainWindow.loadFile('simulator/simulator-main.html');
  })

  ipc.on('main-page', () => {
    mainWindow.loadFile('index.html');
  })

})

app.on('window-all-closed', function () {
  if (!isMac) app.quit()
})
