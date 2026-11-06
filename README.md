# Jorge Meert — Portfólio

> Portfólio pessoal de **Jorge Meert**, estudante de Engenharia de Software e desenvolvedor Full Stack em formação.

🌐 **Acesse o site:** [portifolio-pi-henna.vercel.app](https://portifolio-pi-henna.vercel.app/)

Este projeto reúne minha apresentação, minhas tecnologias e os projetos que desenvolvi durante os estudos. Esta é a versão em **React**, com servidor em **Node.js**, feita a partir do meu portfólio original em HTML, CSS e JavaScript.

## ✨ Funcionalidades

- 🌗 Tema claro e escuro, com a escolha salva no navegador
- ⌨️ Efeito de digitação na apresentação
- 🗂️ Filtro de projetos entre Web/Front-end e Python/Back-end
- 📊 Barra de progresso de rolagem e menu que acompanha a seção atual
- 🖱️ Foto com inclinação 3D e brilho que segue o mouse nos cards
- 📋 Botão para copiar o e-mail com um clique
- 📄 Download do currículo em PDF
- 📱 Layout responsivo

## 🧰 Tecnologias

- **React 18** (componentes, `useState` e `useEffect`)
- **Vite** (ambiente de desenvolvimento e build)
- **Node.js + Express** (servidor e rotas de API)
- **CSS3** (variáveis de cor, Flexbox e Grid)

## 📁 Estrutura

```
app/
├── node_modules/    # dependências (criada pelo npm install)
├── public/          # imagens e currículo (PDF)
├── src/
│   ├── App.jsx      # componentes da página
│   ├── dados.js     # lista de projetos e skills
│   ├── main.jsx     # ponto de entrada do React
│   └── style.css    # estilos e temas
├── server.js        # servidor Express
├── index.html
└── package.json
```

## 🚀 Como rodar

Você precisa ter o [Node.js](https://nodejs.org) instalado (versão LTS).

```bash
# 1. Instalar as dependências
npm install

# 2. Rodar em modo de desenvolvimento
npm run dev
```

Depois, abra o link que aparece no terminal (normalmente `http://localhost:5173`).

### Rodando com o servidor Node

```bash
# Gerar a versão final do site
npm run build

# Subir o servidor
npm start
```

O site fica em `http://localhost:3000`.

## 🔌 Rotas da API

| Rota | O que retorna |
| --- | --- |
| `GET /api/projetos` | Lista de projetos do portfólio |
| `GET /api/skills` | Habilidades agrupadas por categoria |

## ➕ Como adicionar um projeto

Abra `src/dados.js` e adicione um novo objeto na lista `projetos`. O card aparece na página automaticamente.

```js
{
  categoria: 'front', // ou 'back'
  selo: null,
  titulo: 'Nome do projeto',
  descricao: 'O que o projeto faz.',
  tecnologias: 'Tecnologias: React e Node.',
  links: [
    { texto: 'Ver Projeto', href: 'https://...', secundario: false },
    { texto: 'Código', href: 'https://github.com/...', secundario: true },
  ],
}
```

## 📬 Contato

- 📧 jorgeflmrt@gmail.com
- 💼 [LinkedIn](https://www.linkedin.com/in/jorge-meert/)
- 🐙 [GitHub](https://github.com/jorgemeert)
- 📍 Montenegro - RS, Brasil

Feito com React, Node e muito café. ☕
