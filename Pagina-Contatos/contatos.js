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

// Integração: formulário validado. Configure PRISMA_FORM_ENDPOINT para um serviço de envio real.
// Sem endpoint, abrimos um rascunho de e-mail. Isso NÃO significa mensagem enviada.
(() => {
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
      window.location.href='../Pagina-Confirmacao/confirmacao.html';
    }catch(_){aviso.textContent='Não foi possível enviar. Verifique a conexão e tente novamente.';btn.disabled=false}
    return;
  }
  const destino='contato@prismacursos.com'; // e-mail ilustrativo presente no protótipo; validar antes de publicar
  const assunto=encodeURIComponent('Contato Prisma Cursos - '+(form.elements.curso.value||'Informações'));
  const corpo=encodeURIComponent('Nome: '+nome.value+'\nE-mail: '+email.value+'\nCurso: '+form.elements.curso.value+'\n\n'+mensagem.value);
  aviso.textContent='Abrindo seu aplicativo de e-mail. Você ainda precisa enviar a mensagem por ele.';
  window.location.href='mailto:'+destino+'?subject='+assunto+'&body='+corpo;
 });
})();
