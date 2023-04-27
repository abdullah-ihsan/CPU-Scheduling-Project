const {contextBridge, ipcRenderer } = require("electron");
const toastify = require ('toastify-js');

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld("api",{
      send:(data) => ipcRenderer.send(data)
});

contextBridge.exposeInMainWorld('toastify',{
  toast:(options) => toastify(options).showToast()
})