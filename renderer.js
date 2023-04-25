
const usernamelogin = "admin";
const passwordlogin = "123";

document.addEventListener('DOMContentLoaded', () => {

  document.getElementById('login-panel').addEventListener('submit', (event) => {
    // Prevent the form from actually being "submitted", as that will effectively reload the page.
    event.preventDefault()

    // event.target refers to the <form> element that's attached to the submit event.
    const form = event.target
    const username = form.username.value;
    const password = form.password.value;

    console.log([username, password]);

    if(username == usernamelogin && password == passwordlogin){
      window.api.send('login-success');
    }


  })

});