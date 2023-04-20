document.addEventListener('DOMContentLoaded', () => {

  document.getElementById('login').addEventListener('click', () => {
    console.log('login button pressed');
    window.api.send('login-success');
  });
});