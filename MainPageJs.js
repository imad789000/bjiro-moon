//vars

let title = document.querySelector(".title")
let subtext = document.querySelector(".subtext")
let button = document.querySelector(".book")

setTimeout(() => {
    title.classList.add("appearText")
    subtext.classList.add("appearText")
    button.style.opacity = "1"
}, 1);

