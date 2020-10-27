const {app, BrowserWindow} = require('electron')
const url = require('url')
const path = require('path')
const {ipcMain} = require('electron')

let win

function createWindow() {
   win = new BrowserWindow({width: 800, height: 600,
    webPreferences: {
        nodeIntegration: false,
        //contextIsolation: true, // protect against prototype pollution
        enableRemoteModule: false, 
        preload: __dirname + '/preload.js'
    }}) //essencial pra suportar servicos do node, nodeintegration true é perigoso, melhor usar preload
   win.loadURL(url.format ({
      pathname: path.join(__dirname, 'index.html'),
      protocol: 'file:',
      slashes: true
   }))
}

// Event handler for asynchronous incoming messages
ipcMain.on('asynchronous-message', (event, arg) => {
   console.log(arg)

   // Event emitter for sending asynchronous messages
   event.sender.send('asynchronous-reply', 'async pong')
})

// Event handler for synchronous incoming messages
ipcMain.on('synchronous-message', (event, arg) => {
   console.log(arg) 

   // Synchronous event emmision
   event.returnValue = 'sync pong'
})

app.on('ready', createWindow)

//pesquisar mais, foi muito atropelado.