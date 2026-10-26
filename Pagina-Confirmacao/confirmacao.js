const botaoMenu = document.querySelector(".botao-menu");
const botaoFechar = document.querySelector(".botao-fechar");
const menuMobile = document.querySelector(".menu-mobile");

botaoMenu.addEventListener("click", function () {
    menuMobile.classList.add("aberto");
});

botaoFechar.addEventListener("click", function () {
    menuMobile.classList.remove("aberto");
});

menuMobile.addEventListener("click", function (evento) {
    if (evento.target === menuMobile) {
        menuMobile.classList.remove("aberto");
    }
});