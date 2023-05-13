document.addEventListener('DOMContentLoaded', () => {
  /* const func = async () => {
      const response = await window.api.ping()
      console.log(response)
  }

  document.getElementById("go-button").addEventListener('click', async () => {
      const response = await window.api.buttonpressing();
      console.log(response)
  });

  document.getElementById("second-button").addEventListener('click', async () => {
      window.api.second_press()
      window.api.send('second')
  })
  func() */


  document.getElementById('quit-button').addEventListener('click', () => {
      console.log("APP QUIT")
      window.api.send('quit_app')
  })
});

