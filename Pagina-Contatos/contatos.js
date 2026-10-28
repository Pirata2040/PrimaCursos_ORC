// ===== MENU MOBILE =====
const botaoMenu = document.querySelector(".botao-menu");
const menu = document.querySelector("header nav");

botaoMenu.addEventListener("click", function () {
    const estaAberto = menu.classList.toggle("aberto");
    botaoMenu.setAttribute("aria-expanded", estaAberto);
});


/// Formulário: valida os campos e vai para a página de confirmação.
(() => {

 const PAGINA_CONFIRMACAO = '../Pagina-Confirmacao/confirmacao.html';

 const form=document.getElementById('prisma-formulario');
 if(!form) return;
 const aviso=document.getElementById('aviso-formulario');
 form.addEventListener('submit', async (event)=>{
  event.preventDefault();
  const nome=form.elements.nome, email=form.elements.email, mensagem=form.elements.mensagem;
  const campos=[nome,email,mensagem];
  if(campos.some(c=>!c.value.trim()) || !email.validity.valid){
    aviso.textContent='Preencha nome, e-mail válido e mensagem antes de continuar.';
    const invalido=campos.find(c=>!c.value.trim()||!c.validity.valid);invalido?.focus();return;
  }
  const data=new FormData(form);
  const endpoint=window.PRISMA_FORM_ENDPOINT;
  if(endpoint){
    const btn=form.querySelector('.botao-mensagem');btn.disabled=true;aviso.textContent='Enviando mensagem…';
    try{
      const result=await fetch(endpoint,{method:'POST',body:data,headers:{'Accept':'application/json'}});
      if(!result.ok) throw new Error('Falha no envio');
      sessionStorage.setItem('prisma-message-sent','1');
      window.location.href=PAGINA_CONFIRMACAO;
    }catch(_){aviso.textContent='Não foi possível enviar. Verifique a conexão e tente novamente.';btn.disabled=false}
    return;
  }
  // Protótipo: sem serviço de envio configurado, só abre a confirmação.
  sessionStorage.setItem('prisma-message-sent','1');
  window.location.href=PAGINA_CONFIRMACAO;
 });
})();

// ===== ANIMAÇÃO DE ENTRADA (formulário e cards de contato) =====
const elementosAnimados = document.querySelectorAll(".formulario, .canais article");

// se o navegador não tiver IntersectionObserver, tudo fica visível, sem animação
if ("IntersectionObserver" in window) {

    const observador = new IntersectionObserver(function (itens) {
        itens.forEach(function (item) {
            if (item.isIntersecting) {
                item.target.classList.add("visivel");
                observador.unobserve(item.target); // anima só uma vez

                // depois da animação, tira o atraso para não atrapalhar outros efeitos
                setTimeout(function () {
                    item.target.style.transitionDelay = "0s";
                }, 1000);
            }
        });
    }, { threshold: 0.15 });

    elementosAnimados.forEach(function (elemento, posicao) {
        elemento.classList.add("aparecer");
        elemento.style.transitionDelay = (posicao * 0.1) + "s";
        observador.observe(elemento);
    });
}