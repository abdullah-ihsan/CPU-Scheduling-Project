const ipc = require('electron').ipcRenderer;

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('back-to-main').addEventListener('click', () => {
        console.log('back to main menu button pressed');
        ipc.send('main-page');
    })

});