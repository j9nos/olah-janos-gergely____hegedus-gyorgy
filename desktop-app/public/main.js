
const {app, BrowserWindow} = require('electron')
const path = require('path')

require('@electron/remote/main').initialize()

function createWindow () {

  const mainWindow = new BrowserWindow({
    width: 1900,
    height: 940,
    minHeight: 600,
    minWidth: 1000,
    autoHideMenuBar: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      enableRemoteModule: true
    }
  })

  mainWindow.loadURL('http://localhost:3000')


}


app.whenReady().then(() => {
  createWindow()

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})


app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})
