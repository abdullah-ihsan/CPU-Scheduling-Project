const electron = require('electron');
const BrowserWindow = electron.BrowserWindow;
const app = electron.app;
const path = require('path');
const ipc = electron.ipcMain;
const Notification = electron.Notification;


const createWindow = () => {
    const window = new BrowserWindow({
        width: 400, 
        height: 600,
        titleBarStyle: 'hidden',
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    })
    /* ipc.handle('ping', () => 'pong')
    ipc.handle('buttonpressing', () => {
        console.log('button has been pressed (api version) !!!')
        return 'button has been pressed (webpage version)'
    })
    ipc.handle('second_press', () => {
        console.log("something is getting printed laliho! 1")
    }) */
    window.removeMenu() 
    window.loadFile('login_screen.html')
    //window.webContents.openDevTools()
}

const NOTIFICATION_TITLE = 'Basic Notification'
const NOTIFICATION_BODY = 'Notification from the Main process'

function showNotification () {
  new Notification({ title: NOTIFICATION_TITLE, body: NOTIFICATION_BODY }).show()
}

app.whenReady().then(() => {
    createWindow()
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length == 0) createWindow()
    })

    /* ipc.on('second', () => {
        console.log("something is getting printed laliho! 2")
    }) // loads files */

    ipc.on('quit_app', () => {
        showNotification()
        app.quit()
    })

})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin')
        app.quit()
})