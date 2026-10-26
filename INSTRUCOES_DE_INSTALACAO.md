# Prisma Cursos — Quiz simples integrado

Este pacote é a atualização do site inicial. Ele inclui o quiz **no próprio `index.html`**, no trecho `#quiz`.

## Publicar no GitHub Pages

1. Extraia o ZIP.
2. No repositório `Pirata2040/PrimaCursos_ORC`, envie **todos os arquivos do pacote** para a raiz da branch `main`, preservando os caminhos.
3. Substitua o `index.html` anterior e envie também os novos `assets/css/style.css` e `assets/js/script.js`, além das imagens em `assets/`.
4. Confira em **Settings → Pages**: source `Deploy from a branch`, branch `main`, pasta `/(root)`.
5. Acesse `https://pirata2040.github.io/PrimaCursos_ORC/`, clique em **Fazer o quiz** e teste cada resposta.

## O que foi implementado

- Introdução com gamepad e botão **Começar**.
- Três perguntas com três cards clicáveis, ícones e progresso.
- Voltar para rever respostas e reiniciar o quiz.
- Resultado com troféu e um dos três cursos recomendados.
- **Conhecer o curso** leva ao card correto e abre sua descrição.
- Responsividade desktop/tablet/mobile, com opção empilhada em telas pequenas.
- HTML, CSS e JavaScript organizados em arquivos separados; nenhuma biblioteca JS adicional.

### Regra simples de recomendação
A **primeira pergunta** define o curso sugerido, a **terceira** contextualiza o objetivo e a **segunda** registra a preferência sem alterar a recomendação. Esse método replica a simplificação que foi escolhida para o protótipo V12. É uma sugestão exploratória, não orientação vocacional profissional.

## Atenção
- Os depoimentos no site são **exemplos fictícios ilustrativos**: substitua por depoimentos reais autorizados.
- O formulário valida os campos, mas **não envia mensagens para um servidor**. É necessário configurar um serviço ou backend para envio real.
- Para cumprir integralmente o trabalho, confira manualmente em 1920×1080, 768×1024 e 360×800, além de validar todos os links externos e o site publicado.
