//const { Chart } = require('chart.js')
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
    login_press: () => ipcRenderer.invoke('login_press'),
    send: (data) => ipcRenderer.send(data),
    minimize: () => ipcRenderer.invoke('minimize')

})

contextBridge.exposeInMainWorld('Chart', {
  chartCreate: (ctx, data) => Chart(ctx, data),
  chartDelete: () => Chart.clear()
})