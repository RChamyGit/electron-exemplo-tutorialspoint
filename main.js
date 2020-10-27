const {app, BrowserWindow} = require('electron')
const url = require('url')
const path=  require('path')

let win

function createWindow (){
    win = new BrowserWindow({
         width: 800, heigh: 600
        //,
        // webPreferences: {
        //     nodeIntegration: false,
        //     //contextIsolation: true, // protect against prototype pollution
        //     enableRemoteModule: false, 
        //     preload: __dirname + '/preload.js'
        // }
        }) //essencial pra suportar servicos do node, nodeintegration true é perigoso, melhor usar preload
    
        win.loadURL(url.format ({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file:',
        slashes: true
    }))
}

app.on('ready', createWindow)
