const closeMensagem = document.querySelector("#close")
const mensagem = document.querySelector("#mensagem")

closeMensagem.addEventListener("click", () => {
    mensagem.style.display = "none"
})

// function para tirar o display da variável mensagem. após certo tempo.
setTimeout (() => {
    mensagem.style.display = "none"

} ,3000)

