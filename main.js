const electron = require('electron');
const BrowserWindow = electron.BrowserWindow;
const app = electron.app;
const path = require('path');
const ipc = electron.ipcMain;
const Notification = electron.Notification;

const createLoginWindow = () => {
    const loginwindow = new BrowserWindow({
        width: 400, 
        height: 600,
        titleBarStyle: 'hidden',
        webPreferences: {
            enableRemoteModule: true,
            preload: path.join(__dirname, 'preload.js')
        }
    })
    ipc.handle('login_press', () => {
        createMainWindow()
        loginwindow.close()
    })

    

    loginwindow.removeMenu() 
    loginwindow.loadFile('login_screen.html')
    loginwindow.webContents.openDevTools()
}

const createMainWindow = () => {
    const mainwindow = new BrowserWindow({
        width: 1200,
        height: 1000,
        //titleBarStyle: 'hidden',
        autoHideMenuBar: true,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    })
    mainwindow.loadFile('main-menu/main-menu.html')
    //mainwindow.webContents.openDevTools()
    ipc.handle('minimize', () => {
        mainwindow.minimize()
    })

    mainwindow.webContents.openDevTools()
}

const NOTIFICATION_TITLE = 'Basic Notification'
const NOTIFICATION_BODY = 'Notification from the Main process'

/* function showNotification () {
  new Notification({ title: NOTIFICATION_TITLE, body: NOTIFICATION_BODY }).show()
} */

app.whenReady().then(() => {
    createLoginWindow()
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length == 0) createLoginWindow()
    })

    ipc.on('quit_app', () => {
        //showNotification()
        app.quit()
    })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin')
        app.quit()
})