// Menu de navegação responsivo
    const menuToggle=document.getElementById('menuToggle');
    const navLinks=document.getElementById('navLinks');
    function closeMenu(){navLinks.classList.remove('open');menuToggle.setAttribute('aria-expanded','false');menuToggle.setAttribute('aria-label','Abrir menu de navegação');}
    menuToggle.addEventListener('click',()=>{const expanded=menuToggle.getAttribute('aria-expanded')==='true';navLinks.classList.toggle('open',!expanded);menuToggle.setAttribute('aria-expanded',String(!expanded));menuToggle.setAttribute('aria-label',expanded?'Abrir menu de navegação':'Fechar menu de navegação');});
    navLinks.querySelectorAll('a').forEach(link=>link.addEventListener('click',closeMenu));
    document.getElementById('year').textContent=new Date().getFullYear();

    // QUIZ SIMPLES — fluxo fiel ao protótipo de baixa fidelidade.
    // As respostas 1 e 2 representam preferências; a 3 contextualiza o objetivo.
    // É uma sugestão exploratória, não uma avaliação profissional.
    const quizQuestions = [
      {
        title:'O que mais te interessa no momento?',
        options:[
          {label:'Tecnologia e programação',icon:'laptop'},
          {label:'Criatividade e design',icon:'pencil'},
          {label:'Organização e liderança',icon:'chart'}
        ]
      },
      {
        title:'Qual tipo de atividade você mais gosta?',
        options:[
          {label:'Resolver problemas',icon:'code'},
          {label:'Criar e desenvolver ideias',icon:'settings'},
          {label:'Planejar e coordenar',icon:'users'}
        ]
      },
      {
        title:'Qual é o seu principal objetivo?',
        options:[
          {label:'Conseguir meu primeiro emprego',icon:'rocket'},
          {label:'Mudar de carreira',icon:'chart'},
          {label:'Me especializar e evoluir profissionalmente',icon:'star'}
        ]
      }
    ];
    const quizCourses=[
      {name:'Desenvolvimento Web',id:'curso-web',reason:'Você demonstrou interesse por tecnologia e programação. Esse curso pode ser um bom começo para criar páginas e soluções web.'},
      {name:'UX/UI Design',id:'curso-design',reason:'Você demonstrou interesse por criatividade e design. Esse curso é uma oportunidade para explorar interfaces e experiências digitais.'},
      {name:'Gestão de Projetos',id:'curso-gestao',reason:'Você demonstrou interesse por organização e liderança. Esse curso permite conhecer práticas para planejar e acompanhar projetos.'}
    ];
    const quizGoals=[
      'Sua meta é conquistar o primeiro emprego.',
      'Sua meta é mudar de carreira.',
      'Sua meta é se especializar e evoluir profissionalmente.'
    ];
    // Ícones SVG locais, dispensando bibliotecas ou downloads adicionais.
    const paths={
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
    function quizIcon(name){return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths[name]}</svg>`;}
    const quizScreen=document.getElementById('quizScreen');
    const quizLive=document.getElementById('quizLive');
    let quizIndex=-1; // -1: intro, 0..2: perguntas, 3: resultado
    let quizAnswers=[null,null,null];
    function quizDots(count,active){
      const dots=document.createElement('div');dots.className='quiz-dots';dots.setAttribute('aria-hidden','true');
      for(let i=0;i<count;i++){
        const dot=document.createElement('span');dot.className='quiz-dot'+(i===active?' is-active':'');dots.appendChild(dot);
      }
      return dots;
    }
    function quizButton(label,cls,handler){
      const button=document.createElement('button');button.type='button';button.className=cls;button.textContent=label;button.addEventListener('click',handler);return button;
    }
    function quizHeading(label){
      const h=document.createElement('h3');h.id='quizScreenTitle';h.tabIndex=-1;h.textContent=label;return h;
    }
    function announceQuiz(message,focus){
      quizLive.textContent=message;
      if(focus){const heading=document.getElementById('quizScreenTitle');if(heading)heading.focus({preventScroll:true});}
    }
    function renderSimpleQuiz(focus=false){
      quizScreen.replaceChildren();
      if(quizIndex===-1){
        const icon=document.createElement('div');icon.className='quiz-intro-icon';icon.innerHTML=quizIcon('gamepad');quizScreen.appendChild(icon);
        quizScreen.appendChild(quizHeading('Descubra o curso ideal para você'));
        const p=document.createElement('p');p.textContent='Responda a algumas perguntas e vamos indicar um curso que mais combina com seu perfil.';quizScreen.appendChild(p);
        quizScreen.appendChild(quizButton('Começar','btn btn-quiz',()=>{quizIndex=0;renderSimpleQuiz(true)}));
        quizScreen.appendChild(quizDots(4,0));
        announceQuiz('Introdução do quiz.',focus);
        return;
      }
      if(quizIndex===3){
        const icon=document.createElement('div');icon.className='quiz-result-icon';icon.innerHTML=quizIcon('trophy');quizScreen.appendChild(icon);
        const lead=document.createElement('p');lead.className='quiz-result-lead';lead.textContent='Seu perfil combina com';quizScreen.appendChild(lead);
        const course=quizCourses[quizAnswers[0]];
        quizScreen.appendChild(quizHeading(course.name));
        const desc=document.createElement('p');desc.textContent=course.reason+' '+quizGoals[quizAnswers[2]];quizScreen.appendChild(desc);
        const note=document.createElement('p');note.className='quiz-note';note.textContent='Sugestão ilustrativa baseada nas suas escolhas, não um teste vocacional.';quizScreen.appendChild(note);
        const actions=document.createElement('div');actions.className='quiz-result-actions';
        const link=document.createElement('a');link.className='btn btn-quiz';link.href='#'+course.id;link.textContent='Conhecer o curso →';
        link.addEventListener('click',()=>{
          const target=document.getElementById(course.id);
          if(target){const details=target.querySelector('details');if(details)details.open=true;}
        });
        actions.appendChild(link);
        actions.appendChild(quizButton('Refazer quiz','btn btn-secondary',()=>{quizIndex=-1;quizAnswers=[null,null,null];renderSimpleQuiz(true)}));
        quizScreen.appendChild(actions);
        announceQuiz('Resultado: '+course.name,focus);return;
      }
      const head=document.createElement('div');head.className='quiz-head';
      const back=quizButton('← Voltar','quiz-back',()=>{quizIndex-=1;renderSimpleQuiz(true)});
      const progress=document.createElement('div');progress.className='quiz-meter';
      progress.setAttribute('role','progressbar');progress.setAttribute('aria-label','Progresso das perguntas');
      progress.setAttribute('aria-valuemin','0');progress.setAttribute('aria-valuemax','3');progress.setAttribute('aria-valuenow',String(quizIndex+1));
      const bar=document.createElement('div');bar.className='quiz-meter-fill';bar.style.width=`${(quizIndex+1)/3*100}%`;progress.appendChild(bar);
      const count=document.createElement('span');count.className='quiz-count';count.textContent=`Pergunta ${quizIndex+1} de 3`;
      head.append(back,progress,count);quizScreen.appendChild(head);
      const label=document.createElement('span');label.className='quiz-question-label';label.textContent=`Pergunta ${quizIndex+1} de 3`;quizScreen.appendChild(label);
      const question=quizQuestions[quizIndex];quizScreen.appendChild(quizHeading(question.title));
      const opts=document.createElement('div');opts.className='quiz-options';opts.setAttribute('role','group');opts.setAttribute('aria-label',question.title);
      question.options.forEach((item,i)=>{
        const btn=document.createElement('button');btn.type='button';btn.className='quiz-option';
        const icon=document.createElement('span');icon.className='quiz-option-icon';icon.innerHTML=quizIcon(item.icon);
        const title=document.createElement('span');title.textContent=item.label;
        btn.append(icon,title);
        btn.addEventListener('click',()=>{quizAnswers[quizIndex]=i;quizIndex+=1;renderSimpleQuiz(true)});
        opts.appendChild(btn);
      });
      quizScreen.appendChild(opts);
      quizScreen.appendChild(quizDots(3,quizIndex));
      announceQuiz(`Pergunta ${quizIndex+1} de 3: ${question.title}`,focus);
    }
    renderSimpleQuiz();

    // Formulário demonstrativo: valida sem transmitir dados.
    document.getElementById('contactForm').addEventListener('submit',function(event){
      event.preventDefault();
      if(!this.reportValidity())return;
      const status=document.getElementById('formStatus');
      status.textContent='Formulário validado com sucesso! Esta é uma demonstração; sua mensagem não foi enviada.';
      status.classList.add('visible');
      this.reset();
    });
