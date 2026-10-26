# Prisma Cursos 🎓

> **Transformando conhecimento em oportunidades.**

Projeto de desenvolvimento de um **site institucional responsivo com gamificação** para a **Prisma Cursos**, realizado no **Processo Trainee 26.2 da Orc'estra Gamificação**.

O objetivo é transformar o protótipo elaborado no Figma em uma landing page funcional, acessível em diferentes dispositivos, que apresente a instituição, seus cursos e seus diferenciais e facilite o contato com futuros alunos.

**Status:** 🚧 Em desenvolvimento.

## 📚 Sobre o projeto

A Prisma Cursos é um instituto de educação profissionalizante voltado a jovens que buscam o primeiro emprego e a profissionais em transição de carreira. Atua nas áreas de **tecnologia, design e gestão** e tem como diferencial o **ensino híbrido**, que combina aulas online e presenciais com experiências práticas.

O site busca reunir as informações da instituição em um único ambiente digital, oferecendo uma navegação simples e intuitiva e contribuindo para a divulgação dos cursos.

## 🎯 Objetivos

- Apresentar a Prisma Cursos, sua história, missão e valores.
- Divulgar os cursos e destacar a modalidade de ensino híbrido.
- Apresentar depoimentos de alunos para apoiar a credibilidade institucional.
- Facilitar o contato de potenciais alunos por meio de informações e formulário.
- Proporcionar uma experiência interativa com um elemento de gamificação.

## 🧩 Funcionalidades previstas

| Seção / recurso | Descrição |
| --- | --- |
| **Início** | Apresentação do instituto, frase de impacto e botões de navegação. |
| **Quem Somos** | História, missão, valores e proposta de ensino. |
| **Cursos** | Listagem de cursos com nome, descrição e informações sobre a formação. |
| **Depoimentos** | Apresentação de relatos de alunos. |
| **Contato** | Informações de contato e formulário com validação dos campos. |
| **Menu responsivo** | Navegação adaptada a desktop, tablet e celular. |
| **Quiz de gamificação** | Experiência interativa para indicar um curso conforme os interesses do visitante. |

### 🎮 Quiz: Descubra o curso ideal para você

O elemento de gamificação definido na prototipação é um **quiz de recomendação de cursos**, composto por três perguntas de múltipla escolha sobre:

1. Área de interesse do usuário.
2. Tipo de atividade de que mais gosta.
3. Principal objetivo profissional.

A experiência inclui **indicador de progresso**, etapas navegáveis e apresentação de uma sugestão de curso ao final. As possibilidades previstas no protótipo são **Desenvolvimento Web**, **UX/UI Design** e **Gestão de Projetos**.

A proposta é tornar a descoberta dos cursos mais envolvente e auxiliar visitantes que ainda não sabem qual formação escolher. O quiz é uma orientação inicial, e não uma avaliação profissional definitiva.

## 🛠️ Tecnologias

Tecnologias principais previstas para o desenvolvimento:

- **HTML5** — estrutura e conteúdo do site.
- **CSS3** — estilização, layout e responsividade.
- **JavaScript** — interações, quiz e validação do formulário.
- **Git e GitHub** — versionamento e colaboração.
- **GitHub Pages** — publicação do site.
- **Figma** — referência do protótipo e da identidade visual.

## 🎨 Identidade visual

O desenvolvimento deve seguir a identidade definida na etapa de prototipação.

| Uso | Cor | Código |
| --- | --- | --- |
| Primária | Azul profundo | `#1E3A8A` |
| Secundária | Azul médio | `#2563EB` |
| Gamificação e destaques | Roxo | `#7C3AED` |
| Sucesso e ações positivas | Verde | `#16A34A` |
| Fundo principal | Branco | `#FFFFFF` |
| Fundo secundário | Cinza muito claro | `#F8FAFC` |
| Bordas | Cinza claro | `#E2E8F0` |
| Texto principal | Azul quase preto | `#0F172A` |
| Texto secundário | Cinza escuro | `#475569` |

**Tipografia:** Poppins para títulos e Inter para textos.

## 📱 Responsividade

O site deverá adaptar seus elementos, textos, imagens e navegação a diferentes resoluções. Os tamanhos de referência previstos nos requisitos são:

- **Desktop:** 1920 × 1080 px.
- **Tablet:** 768 × 1024 px.
- **Mobile:** 360 × 800 px.

## 📁 Estrutura de arquivos sugerida

A estrutura abaixo é uma **proposta inicial**, a ser ajustada à organização real do repositório durante o desenvolvimento:

```text
prisma-cursos-site/
├── index.html
├── assets/
│   ├── images/
│   └── icons/
├── css/
│   └── style.css
├── js/
│   └── script.js
└── README.md
```

## 💻 Executando localmente

Depois que o código do site estiver adicionado ao repositório:

```bash
git clone https://github.com/SEU-USUARIO/prisma-cursos-site.git
cd prisma-cursos-site
```

Abra o `index.html` no navegador. Durante o desenvolvimento, pode-se utilizar uma extensão de servidor local, como o **Live Server** no VS Code, para visualizar as alterações.

> Substitua `SEU-USUARIO` pelo proprietário real do repositório.

## 🌐 Publicação

A versão final deverá ser disponibilizada por meio do **GitHub Pages**. Para um site estático com `index.html` na raiz do repositório, a publicação pode ser configurada em **Settings → Pages**, selecionando a branch de publicação e o diretório correspondente.

**Link do site:** a adicionar após o deploy.

**Link do protótipo no Figma:** a adicionar pela equipe.

## 🌿 Organização do desenvolvimento

O trabalho será organizado em branches por funcionalidade ou seção. Exemplos:

```text
feature/inicio
feature/quem-somos
feature/cursos
feature/depoimentos
feature/contato
feature/quiz
```

Os commits devem seguir o padrão **Conventional Commits**, conforme as instruções do processo:

```bash
feat(inicio): implementa seção inicial
feat(quiz): adiciona perguntas interativas
fix(contato): corrige validação de e-mail
style(cursos): ajusta layout responsivo
docs(readme): documenta o projeto
```

As alterações deverão ser integradas à branch principal de maneira coordenada, com um responsável pelos merges.

## ✅ Requisitos de qualidade

O site final deverá atender aos requisitos funcionais e não funcionais definidos para a etapa de desenvolvimento, incluindo:

- Navegação funcional, sem links quebrados.
- Conteúdo institucional e cursos apresentados de forma clara.
- Formulário de contato com validação dos campos obrigatórios e confirmação.
- Quiz funcionando efetivamente no navegador, conforme o protótipo.
- Layout consistente e responsivo.
- Código organizado e legível, com HTML, CSS e JavaScript devidamente separados.
- Histórico de desenvolvimento no GitHub e publicação no GitHub Pages.

## 👥 Equipe

Projeto desenvolvido pela equipe participante do **Processo Trainee 26.2 — Orc'estra Gamificação**.

*Os integrantes e suas respectivas responsabilidades podem ser acrescentados aqui.*

---

**Prisma Cursos** — conhecimento, prática e novas oportunidades.
