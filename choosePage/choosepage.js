document.addEventListener('gesturestart', function (e) {
e.preventDefault();
});

document.addEventListener('gesturechange', function (e) {
e.preventDefault();
});

document.addEventListener('gestureend', function (e) {
e.preventDefault();
});
  



let buttons = document.querySelectorAll('.book-button')
// let margaritaHeader = document.getElementById('margaritaheader')
// let tulipHeader = document.getElementById('tulipheader')
// let lilyHeader = document.getElementById('lilyheader')





for(let i = 0 ; i < buttons.length; i++){
    buttons[i].addEventListener('click',() =>{
        window.location.href='../booking/booking.html'
        localStorage.setItem('docname', buttons[i].innerText);

    })
}

