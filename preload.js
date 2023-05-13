const { contextBridge, ipcRenderer } = require("electron")

window.addEventListener('DOMContentLoaded', () => {
    const replaceText = (selector, text) => {
      const element = document.getElementById(selector)
      if (element) element.innerText = text
    }
  
    for (const dependency of ['chrome', 'node', 'electron']) {
      replaceText(`${dependency}-version`, process.versions[dependency])
    }
  })

contextBridge.exposeInMainWorld('api',{
    /* ping: () => ipcRenderer.invoke('ping'),
    buttonpressing: () => ipcRenderer.invoke('buttonpressing'),
    second_press: () => ipcRenderer.invoke('second_press'),*/
    send: (data) => ipcRenderer.send(data) 
})