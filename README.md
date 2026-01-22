
# Shopping Life — Frontend

🌐 **Site em produção:** [https://projectshoppinglife.netlify.app/](https://projectshoppinglife.netlify.app/)

Este repositório contém o frontend do projeto "Shopping Life": uma aplicação React com TypeScript e Vite.

## O que é o projeto

Shopping Life é o frontend (Single Page Application) de uma plataforma de compras on-line. A aplicação fornece a interface para navegar por produtos, criar/entrar em contas de usuário e gerenciar um carrinho de compras, tudo rodando no cliente com rotas SPA.

## Principais responsabilidades / features

- Navegação e listagem de produtos com rotas no cliente (SPA).
- Fluxo de autenticação e cadastro de usuários.
- Gerenciamento do carrinho: adicionar, atualizar quantidades e remover itens.
- Visualização do status do carrinho e integração com APIs através do Axios.
- Preparado para build de produção e deploy contínuo (Netlify), com suporte a fallback para rotas SPA (`public/_redirects`).

O README abaixo explica como configurar, rodar em desenvolvimento, gerar o build para produção e fazer deploy (Netlify).

## Tecnologias

- React 19 + TypeScript
- Vite
- React Router
- Axios
- ESLint

## Pré-requisitos

- Node.js (recomenda-se v18 ou superior)
- npm (ou yarn/pnpm se preferir)

## Instalação

1. Clone o repositório (se não estiver clonado):

2. Instale as dependências:

```bash
npm install
```

## Scripts úteis

Os scripts disponíveis em `package.json`:

- `npm run dev` — inicia o servidor de desenvolvimento (Vite + HMR)
- `npm run build` — compila TypeScript e gera o build de produção (Vite)
- `npm run preview` — roda um servidor local para pré-visualizar o build
- `npm run lint` — roda o ESLint no código

Exemplo (desenvolvimento):

```bash
npm run dev
```

## Estrutura principal do projeto

Alguns arquivos/pastas relevantes:

- `index.html` — ponto de entrada HTML
- `src/main.tsx` — bootstrap da app
- `src/App.tsx` — componente principal
- `src/components/` — componentes organizados por funcionalidade (AuthenticationGateway, Cadastra, Carrinho, Layout, Login, Menu, StatusCarrinho, UsuarioLogado, ...)
- `public/` — ativos públicos (ex.: `_redirects` usado pelo Netlify)

## Configuração de build e deploy (Netlify)

Este projeto já inclui um arquivo `netlify.toml` na raiz, então é possível conectar o repositório ao Netlify para deploy automático.

Passos básicos para deploy no Netlify:

1. No Netlify, crie um novo site a partir do repositório Git (GitHub/GitLab/Bitbucket).
2. Configure os comandos de build:

- Build command: `npm run build`
- Publish directory: `frontend/dist` ou o diretório de saída configurado (ver `vite.config.ts` se tiver customização)

3. (Opcional) Variáveis de ambiente: defina no painel do Netlify se a sua app requer chaves (API, etc.).

Observação: o arquivo `public/_redirects` já existe para ajudar em rotas SPA no Netlify.

## Lint

Rode o ESLint com:

```bash
npm run lint
```

## Como contribuir

- Abra uma issue descrevendo a sugestão ou bug.
- Crie um branch com um nome descritivo.
- Faça commits claros e crie um Pull Request apontando para `main`.

## Contato

- 💼 [LinkedIn](https://www.linkedin.com/in/richard-moraes-souza-998539338/)
- 🌐 [Portfólio](https://richardmoraes.netlify.app/)
- 📱 [WhatsApp](https://wa.me/5547999326217?text=Olá%20Richard%2C%20encontrei%20seu%20perfil%20no%20GitHub!)
- 📧 richardmoraessouza2006@gmail.com
---

