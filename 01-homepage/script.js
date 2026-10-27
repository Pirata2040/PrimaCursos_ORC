// ========== MENU DO CELULAR ==========
// pega o botão (☰) e o menu pelos ids que colocamos no HTML
const botaoMenu = document.getElementById("botao-menu");
const menu = document.getElementById("menu");

// quando clicar no botão, abre ou fecha o menu
botaoMenu.addEventListener("click", function () {
    // toggle: se a classe "aberto" existe, tira; se não existe, coloca
    const aberto = menu.classList.toggle("aberto");

    // atualiza o atributo de acessibilidade
    botaoMenu.setAttribute("aria-expanded", aberto);
});

// fecha o menu quando o usuário clica em algum link dele
const linksDoMenu = document.querySelectorAll("#menu a");

linksDoMenu.forEach(function (link) {
    link.addEventListener("click", function () {
        menu.classList.remove("aberto");
        botaoMenu.setAttribute("aria-expanded", "false");
    });
});


// ========== ANIMAÇÃO DOS BENEFÍCIOS ==========
// os cartões aparecem suavemente quando entram na tela
const beneficios = document.querySelectorAll(".beneficio");

// se o navegador for muito antigo e não tiver o IntersectionObserver,
// não faz nada (os cartões continuam visíveis normalmente)
if ("IntersectionObserver" in window) {

    // o observador "olha" os elementos e avisa quando aparecem na tela
    const observador = new IntersectionObserver(function (itens) {
        itens.forEach(function (item) {
            if (item.isIntersecting) {
                item.target.classList.add("visivel");
                observador.unobserve(item.target); // anima só uma vez
            }
        });
    }, { threshold: 0.2 });

    beneficios.forEach(function (cartao, posicao) {
        cartao.classList.add("aparecer");
        // cada cartão demora um pouquinho mais que o anterior
        cartao.style.transitionDelay = (posicao * 0.1) + "s";
        observador.observe(cartao);
    });
}