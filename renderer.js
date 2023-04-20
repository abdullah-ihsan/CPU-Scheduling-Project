

document.addEventListener('DOMContentLoaded', () => {

  // document.getElementById('login').addEventListener('click', () => {
  //   console.log('login button pressed');
  //   window.api.send('login-success');
  // });
  const submitFormButton = document.querySelector("#login-panel");

  submitFormButton.addEventListener("login", function(event){
    event.preventDefault();
    console.log('login button pressed');
    window.api.send('login-success');
  });

});