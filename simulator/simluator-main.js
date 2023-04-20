

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('back-to-main').addEventListener('click', () => {
        window.api.send("main-page");
        console.log('back to main menu button pressed');
    })

    

});