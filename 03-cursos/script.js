// Este script funciona em TODAS as páginas (Início, Quem Somos e Cursos).
// Basta copiar o mesmo arquivo para cada pasta.

// ========== MENU DO CELULAR ==========
const botaoMenu = document.getElementById("botao-menu");
const menu = document.getElementById("menu");

// só roda se a página tiver o botão e o menu
if (botaoMenu && menu) {

    // clicou no ☰: abre ou fecha o menu
    botaoMenu.addEventListener("click", function () {
        const aberto = menu.classList.toggle("aberto");
        botaoMenu.setAttribute("aria-expanded", aberto);
    });

    // clicou em um link do menu: fecha o menu
    menu.querySelectorAll("a").forEach(function (link) {
        link.addEventListener("click", function () {
            menu.classList.remove("aberto");
            botaoMenu.setAttribute("aria-expanded", "false");
        });
    });
}


// ========== ANIMAÇÃO DOS CARTÕES ==========
// os cartões aparecem suavemente quando entram na tela
// (.beneficio = Início, .card = Quem Somos, .curso = Cursos)
const cartoes = document.querySelectorAll(".beneficio, .card, .curso");

// se o navegador não tiver IntersectionObserver, os cartões ficam visíveis normalmente
if ("IntersectionObserver" in window) {

    const observador = new IntersectionObserver(function (itens) {
        itens.forEach(function (item) {
            if (item.isIntersecting) {
                item.target.classList.add("visivel");
                observador.unobserve(item.target); // anima só uma vez

                // depois da animação, tira o atraso para não atrapalhar o hover
                setTimeout(function () {
                    item.target.style.transitionDelay = "0s";
                }, 1000);
            }
        });
    }, { threshold: 0.15 });

    cartoes.forEach(function (cartao, posicao) {
        cartao.classList.add("aparecer");
        cartao.style.transitionDelay = ((posicao % 4) * 0.1) + "s";
        observador.observe(cartao);
    });
}