const electron = require('electron');
const BrowserWindow = electron.BrowserWindow;
const app = electron.app;
const path = require('path');
let mainWindow;
const ipc = electron.ipcMain;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      preload: path.join(__dirname, 'preload.js')
    }
  })
  mainWindow.loadFile('index.html')
  // opens devtools
  mainWindow.webContents.openDevTools()
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
  if (process.platform !== 'darwin') app.quit()
})
