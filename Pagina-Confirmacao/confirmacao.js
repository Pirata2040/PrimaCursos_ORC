// ===== MENU MOBILE =====
const botaoMenu = document.querySelector(".botao-menu");
const menu = document.querySelector("header nav");

botaoMenu.addEventListener("click", function () {
    const estaAberto = menu.classList.toggle("aberto");
    botaoMenu.setAttribute("aria-expanded", estaAberto);
});