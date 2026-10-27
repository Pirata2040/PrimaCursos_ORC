/* PRISMA CURSOS — Apenas o quiz. Não altera menu, formulários ou outras seções. */
(() => {
  'use strict';
  function iniciarQuizPrisma() {
    const screen = document.getElementById('pcq-screen');
    const status = document.getElementById('pcq-status');
    if (!screen || !status) return; // não interfere nas páginas que não tenham quiz

    const perguntas = [
      { titulo: 'O que mais te interessa no momento?', opcoes: [
        {texto:'Tecnologia e programação',icone:'laptop'},
        {texto:'Criatividade e design',icone:'pencil'},
        {texto:'Organização e liderança',icone:'chart'}
      ]},
      { titulo: 'Qual tipo de atividade você mais gosta?', opcoes: [
        {texto:'Resolver problemas',icone:'code'},
        {texto:'Criar e desenvolver ideias',icone:'settings'},
        {texto:'Planejar e coordenar',icone:'users'}
      ]},
      { titulo: 'Qual é o seu principal objetivo?', opcoes: [
        {texto:'Conseguir meu primeiro emprego',icone:'rocket'},
        {texto:'Mudar de carreira',icone:'chart'},
        {texto:'Me especializar e evoluir profissionalmente',icone:'star'}
      ]}
    ];

    // Versão simples do protótipo: a primeira resposta escolhe a área;
    // as respostas seguintes apenas contextualizam a recomendação.
    const cursos = [
      { nome:'Desenvolvimento Web', id:'curso-web', descricao:'Você demonstrou interesse em tecnologia e programação. Desenvolvimento Web pode ser uma boa opção para explorar a criação de sites e soluções digitais.' },
      { nome:'UX/UI Design', id:'curso-design', descricao:'Você demonstrou interesse em criatividade e design. UX/UI Design pode ajudar você a explorar interfaces e experiências digitais.' },
      { nome:'Gestão de Projetos', id:'curso-gestao', descricao:'Você demonstrou interesse em organização e liderança. Gestão de Projetos pode ajudar você a aprender sobre planejamento e coordenação.' }
    ];
    const atividades = ['resolver problemas','criar e desenvolver ideias','planejar e coordenar'];
    const objetivos = [
      'Seu objetivo é conseguir o primeiro emprego.',
      'Seu objetivo é mudar de carreira.',
      'Seu objetivo é se especializar e evoluir profissionalmente.'
    ];
    const desenhos = {
      gamepad:'<path d="M6.5 10h11a4 4 0 0 1 3.9 3.1l.7 3.1a2 2 0 0 1-3.2 2l-2.7-2H7.8l-2.7 2a2 2 0 0 1-3.2-2l.7-3.1A4 4 0 0 1 6.5 10Z"/><path d="M7 13v4m-2-2h4"/><path d="M16 13h.01M18 15h.01"/>',
      trophy:'<path d="M8 21h8m-4-4v4m-7-17h14v7a7 7 0 0 1-14 0V4Z"/><path d="M5 6H2v4a4 4 0 0 0 4 4m13-8h3v4a4 4 0 0 1-4 4"/>',
      laptop:'<rect x="4" y="4" width="16" height="12" rx="1"/><path d="M2 20h20l-2-4H4l-2 4Z"/>',
      pencil:'<path d="m14 5 5 5M3 21l4.5-1 13-13a2 2 0 0 0-3-3l-13 13L3 21Z"/>',
      chart:'<path d="M4 20V12m8 8V7m8 13V3" stroke-width="4"/>',
      code:'<path d="m8 6-6 6 6 6m8-12 6 6-6 6M14 4l-4 16"/>',
      settings:'<path d="M12 3v2m0 14v2M3 12h2m14 0h2M5.6 5.6 7 7m10 10 1.4 1.4M5.6 18.4 7 17m10-10 1.4-1.4"/><circle cx="12" cy="12" r="5"/>',
      users:'<circle cx="8" cy="8" r="3"/><circle cx="17" cy="9" r="2.5"/><path d="M2 21v-2a6 6 0 0 1 12 0v2m1-6a5 5 0 0 1 7 4v2"/>',
      rocket:'<path d="M12 16c3-1 6-4 8-12-8 2-11 5-12 8l4 4Z"/><path d="m8 12-4 1-2 5 6-2m4 0-1 4-5 2 2-6"/><circle cx="16" cy="8" r="1"/>',
      star:'<path d="m12 2 3.1 6.3 7 .9-5 4.8 1.2 7-6.3-3.3-6.3 3.3 1.2-7-5-4.8 7-.9L12 2Z"/>'
    };
    const icone = nome => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${desenhos[nome]}</svg>`;
    let etapa = -1; // -1 introdução; 0 a 2 perguntas; 3 resultado
    let respostas = [null,null,null];

    function elemento(tag, classe='', texto=null) {
      const item = document.createElement(tag);
      if (classe) item.className = classe;
      if (texto !== null) item.textContent = texto;
      return item;
    }
    function botao(texto, classe, acao) {
      const item = elemento('button', classe, texto);
      item.type = 'button';
      item.addEventListener('click', acao);
      return item;
    }
    function titulo(texto) {
      const item = elemento('h3','',texto);
      item.id = 'pcq-current-title';
      item.tabIndex = -1;
      return item;
    }
    function bolinhas(qtd, indice) {
      const barra = elemento('div','pcq-dots');
      barra.setAttribute('aria-hidden','true');
      for (let i=0; i<qtd; i++) barra.appendChild(elemento('span','pcq-dot'+(i===indice?' is-active':'')));
      return barra;
    }
    function atualizar(mensagem, foco) {
      status.textContent = mensagem;
      if (foco) document.getElementById('pcq-current-title')?.focus({preventScroll:true});
    }
    function desenhar(foco=false) {
      screen.replaceChildren();
      if (etapa === -1) {
        const arte = elemento('div','pcq-icon-large'); arte.innerHTML=icone('gamepad');
        screen.append(arte, titulo('Descubra o curso ideal para você'));
        screen.appendChild(elemento('p','', 'Responda a algumas perguntas e vamos indicar um curso que combina com seu perfil.'));
        screen.appendChild(botao('Começar','pcq-btn',()=>{etapa=0;desenhar(true);}));
        screen.appendChild(bolinhas(4,0));
        atualizar('Introdução do quiz.', foco);
        return;
      }
      if (etapa === 3) {
        const arte = elemento('div','pcq-icon-large'); arte.innerHTML=icone('trophy');
        const curso = cursos[respostas[0]];
        screen.append(arte, elemento('p','pcq-result-lead','Seu perfil combina com'), titulo(curso.nome));
        screen.appendChild(elemento('p','', `${curso.descricao} Você também gosta de ${atividades[respostas[1]]}. ${objetivos[respostas[2]]}`));
        screen.appendChild(elemento('p','pcq-note','Sugestão baseada nas suas escolhas, não um teste vocacional.'));
        const acoes = elemento('div','pcq-result-actions');
        const link = elemento('a','pcq-btn','Conhecer o curso →');
        // Funciona com IDs dos cards originais; caso faltem, navega à seção Cursos.
        link.href = `../03-cursos/index.html#${curso.id}`;
        acoes.append(link, botao('Refazer quiz','pcq-btn pcq-btn-secondary',()=>{
          etapa=-1; respostas=[null,null,null]; desenhar(true);
        }));
        screen.appendChild(acoes);
        atualizar(`Resultado: ${curso.nome}.`, foco);
        return;
      }
      const head = elemento('div','pcq-head');
      head.appendChild(botao('← Voltar','pcq-back',()=>{etapa--;desenhar(true);}));
      const progresso = elemento('div','pcq-progress');
      progresso.setAttribute('role','progressbar');
      progresso.setAttribute('aria-label','Progresso das perguntas');
      progresso.setAttribute('aria-valuemin','0');
      progresso.setAttribute('aria-valuemax','3');
      progresso.setAttribute('aria-valuenow',String(etapa+1));
      const barra = elemento('div','pcq-progress-bar');
      barra.style.width=`${(etapa+1)/3*100}%`;
      progresso.appendChild(barra); head.appendChild(progresso); screen.appendChild(head);
      screen.appendChild(elemento('span','pcq-question-number',`Pergunta ${etapa+1} de 3`));
      const pergunta=perguntas[etapa];
      screen.appendChild(titulo(pergunta.titulo));
      const opcoes=elemento('div','pcq-options');
      opcoes.setAttribute('role','group');
      opcoes.setAttribute('aria-label',pergunta.titulo);
      pergunta.opcoes.forEach((op,i)=>{
        const escolha=botao('', 'pcq-option'+(respostas[etapa]===i?' is-selected':''),()=>{
          respostas[etapa]=i; etapa++; desenhar(true);
        });
        const arte=elemento('span','pcq-option-icon'); arte.innerHTML=icone(op.icone);
        escolha.append(arte, elemento('span','',op.texto));
        opcoes.appendChild(escolha);
      });
      screen.append(opcoes,bolinhas(3,etapa));
      atualizar(`Pergunta ${etapa+1} de 3: ${pergunta.titulo}`,foco);
    }
    desenhar();
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', iniciarQuizPrisma, {once:true});
  } else iniciarQuizPrisma();
})();
