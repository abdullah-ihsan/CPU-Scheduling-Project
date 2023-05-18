
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('quit-button').addEventListener('click', () => {
        console.log("APP QUIT")
        window.api.send('quit_app')
    })

    document.getElementById('login').addEventListener('click', () => {
        window.close()
        window.api.login_press()
    })


    //document.querySelector('#login').addEventListener()
})
