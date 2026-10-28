const botaoMenu = document.querySelector(".botao-menu");
const menu = document.querySelector("header nav");

botaoMenu.addEventListener("click", function () {
    const estaAberto = menu.classList.toggle("aberto");
    botaoMenu.setAttribute("aria-expanded", estaAberto);
});


// carrossel(celular)
const cards = document.querySelector(".cards");
const cartoes = document.querySelectorAll(".balao");

let indiceAtual = 0;       
let ultimaInteracao = 0;   

// cria as bolinhas, uma para cada card
const areaPontos = document.createElement("div");
areaPontos.className = "pontos";
cards.insertAdjacentElement("afterend", areaPontos);

const pontos = [];

cartoes.forEach(function (cartao, posicao) {
    const ponto = document.createElement("button");
    ponto.className = "ponto";
    ponto.setAttribute("aria-label", "Ver depoimento " + (posicao + 1));

    ponto.addEventListener("click", function () {
        registrarInteracao();
        irParaCard(posicao);
    });

    areaPontos.appendChild(ponto);
    pontos.push(ponto);
});

function registrarInteracao() {
    ultimaInteracao = Date.now();
}

// marca qual card e qual bolinha estão ativos
function marcarAtivo(indice) {
    indiceAtual = indice;

    cartoes.forEach(function (cartao, posicao) {
        cartao.classList.toggle("ativo", posicao === indice);
        pontos[posicao].classList.toggle("ativo", posicao === indice);
    });
}

// distância de um card até o próximo (largura do card + espaço entre eles)
function distanciaEntreCards() {
    return cartoes[1].offsetLeft - cartoes[0].offsetLeft;
}

function irParaCard(indice) {
    cards.scrollTo({ left: indice * distanciaEntreCards(), behavior: "smooth" });
}

// olha onde o carrossel está e descobre qual card está na frente
function descobrirCardAtivo() {
    const fimDaLista = cards.scrollWidth - cards.clientWidth;

    if (cards.scrollLeft >= fimDaLista - 5) {
        return cartoes.length - 1;
    }

    return Math.round(cards.scrollLeft / distanciaEntreCards());
}

// sempre que o carrossel rola (pelo dedo ou sozinho), atualiza o destaque
cards.addEventListener("scroll", function () {
    marcarAtivo(descobrirCardAtivo());
});

// se a pessoa tocar ou arrastar, o automático espera
["touchstart", "touchmove", "mousedown", "wheel"].forEach(function (nomeDoEvento) {
    cards.addEventListener(nomeDoEvento, registrarInteracao, { passive: true });
});

// volta ao primeiro card com um fade, em vez de rebobinar
function voltarAoPrimeiro() {
    cards.classList.add("trocando");

    setTimeout(function () {
        cards.scrollLeft = 0;
        cards.classList.remove("trocando");
    }, 300);
}

function proximoCard() {
    // no desktop os 3 cards já aparecem juntos
    if (window.innerWidth > 900) {
        return;
    }

    // se a pessoa mexeu há menos de 6 segundos, espera
    if (Date.now() - ultimaInteracao < 6000) {
        return;
    }

    if (indiceAtual < cartoes.length - 1) {
        irParaCard(indiceAtual + 1);
    } else {
        voltarAoPrimeiro();
    }
}

marcarAtivo(0);
setInterval(proximoCard, 3000);


// animação de entrada dos cards (só no desktop) 
if ("IntersectionObserver" in window && window.innerWidth > 900) {

    const observador = new IntersectionObserver(function (itens) {
        itens.forEach(function (item) {
            if (item.isIntersecting) {
                item.target.classList.add("visivel");
                observador.unobserve(item.target);

                // depois da animação, tira o atraso para não atrasar outros efeitos
                setTimeout(function () {
                    item.target.style.transitionDelay = "0s";
                }, 1000);
            }
        });
    }, { threshold: 0.15 });

    cartoes.forEach(function (cartao, posicao) {
        cartao.classList.add("aparecer");
        cartao.style.transitionDelay = (posicao * 0.1) + "s";
        observador.observe(cartao);
    });
}