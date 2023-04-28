const {BrowserWindow, app, Menu,ipcMain} = require('electron')
const path = require('path');
let mainWindow;
const isMac = process.platform === 'darwin';

//process.env.NODE_ENV !== 'production' // Set to production to exit dev more
const isDev = process.env.NODE_ENV !== 'production'



function createMainWindow() {
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

function createAboutWindow(){
  aboutWindow = new BrowserWindow({
    title: 'About',
    width: 500,
    height: 500,
  })

  aboutWindow.loadFile('about.html')
}

const menu = [
  ...isMac? [{
    label: app.name,
    submenu: [{
      label: 'About',
      click: createAboutWindow
    }
    ]
   }

  ]:[],
  {
    role: 'fileMenu'
  },
  ...!isMac?[{
    label: 'Help',
    submenu:[{
      label: 'About',
      click: createAboutWindow
    }]
  }]:[],
]

app.whenReady().then(() => {
  createMainWindow()
  //implement menu
  const mainMenu = Menu.buildFromTemplate(menu);
  Menu.setApplicationMenu(mainMenu); 

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createMainWindow()
  })


  ipcMain.on('login-success', () => {
    console.log('login ipcMain received');
    mainWindow.loadFile('simulator/simulator-main.html');
  })

  ipcMain.on('main-page', () => {
    mainWindow.loadFile('index.html');
  })

})

app.on('window-all-closed', function () {
  if (!isMac) app.quit()
})
