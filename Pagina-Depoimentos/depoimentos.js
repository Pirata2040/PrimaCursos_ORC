// ===== MENU MOBILE =====
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

// ===== CARROSSEL (só funciona no celular) =====
const cards = document.querySelector(".cards");

function proximoCard() {
    if (window.innerWidth > 900) {
        return;
    }

    const primeiroCard = cards.querySelector(".balao");
    const passo = primeiroCard.offsetWidth + 16;
    const fimDaLista = cards.scrollWidth - cards.clientWidth;

    if (cards.scrollLeft >= fimDaLista - 5) {
        cards.scrollTo({ left: 0, behavior: "smooth" });
    } else {
        cards.scrollBy({ left: passo, behavior: "smooth" });
    }
}

setInterval(proximoCard, 4000);