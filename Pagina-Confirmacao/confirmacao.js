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
// A tela de sucesso só deve ser exibida quando o formulário recebeu confirmação do serviço configurado.
if(sessionStorage.getItem('prisma-message-sent') !== '1') {
  window.location.replace('../Pagina-Contatos/contatos.html');
} else {
  sessionStorage.removeItem('prisma-message-sent');
}
