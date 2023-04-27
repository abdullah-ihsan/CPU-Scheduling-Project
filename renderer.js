
const usernamelogin = "admin";
const passwordlogin = "123";
const form = document.getElementById('login-panel')

function formSubmitted(event){
    // Prevent the form from actually being "submitted", as that will effectively reload the page.
    event.preventDefault()

    // event.target refers to the <form> element that's attached to the submit event.
    const form = event.target
    const username = form.username.value;
    const password = form.password.value;

    console.log([username, password]);

    if(username == usernamelogin && password == passwordlogin){
      alertMessage('login successful')
      window.api.send('login-success');
    } else {
      errorMessage('Incorrect Username or Password!');
    }
}

function alertMessage(message){
  toastify.toast({
    text: message,
    duration: 5000,
    close: false,
    style:{
      background: 'green',
      color: 'white',
      textAlign: 'center'
    }
  })
}

function errorMessage(message){
  toastify.toast({
    text: message,
    duration: 5000,
    close: false,
    style:{
      background: 'red',
      color: 'white',
      textAlign: 'center'
    }
  })
}

form.addEventListener('submit', formSubmitted)
