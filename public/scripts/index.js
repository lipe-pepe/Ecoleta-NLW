const buttonSearch = document.querySelector("#page-home main a")
const modal = document.querySelector("#modal")
const close = document.querySelector("#modal .header a")

//Abrindo o modal
buttonSearch.addEventListener("click", () => {
    modal.classList.remove("hide")
})

//Fechando o modal
close.addEventListener("click", () => {
    modal.classList.add("hide")
})