
const ipc = require('electron').ipcRenderer;

document.addEventListener('DOMContentLoaded', () => {

  document.getElementById('login').addEventListener('click', () => {
    console.log('login button pressed');
    ipc.send('login-success');
  });

});