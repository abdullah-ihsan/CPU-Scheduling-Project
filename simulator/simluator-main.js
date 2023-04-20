document.addEventListener('DOMContentLoaded', () => {

    document.getElementById('back-to-main').addEventListener('click', () => {
        console.log('back to main menu button pressed');
        window.api.send('main-page');
    })

});