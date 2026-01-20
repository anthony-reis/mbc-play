<div align="center">
  <h1>🎬 MBCPLAY</h1>
  <p><strong>Explore os melhores filmes e séries</strong></p>
  
  <p>
    <img src="https://img.shields.io/badge/Next.js-16.1.3-black?style=for-the-badge&logo=next.js" alt="Next.js" />
    <img src="https://img.shields.io/badge/React-19.2.3-61dafb?style=for-the-badge&logo=react" alt="React" />
    <img src="https://img.shields.io/badge/TypeScript-5.0-3178c6?style=for-the-badge&logo=typescript" alt="TypeScript" />
    <img src="https://img.shields.io/badge/Tailwind-4.0-06b6d4?style=for-the-badge&logo=tailwindcss" alt="Tailwind" />
  </p>
</div>

---

## 📖 Sobre

Plataforma moderna para descoberta de filmes e séries, construída com Next.js 16 e integração com a API do TMDB.

### ✨ Features

- 🎯 Interface responsiva e intuitiva
- 🔍 Busca e filtros por gênero
- 📊 Detalhes completos com elenco e trailers
- ⚡ Cache inteligente com TanStack Query
- 🎬 Player de trailers integrado

---

## 🛠️ Tech Stack

- **Next.js 16** - App Router + Server Components
- **React 19** - Biblioteca UI
- **TypeScript** - Tipagem estática
- **Tailwind CSS 4** - Estilização
- **shadcn/ui** - Componentes reutilizáveis
- **TanStack Query** - Cache de dados
- **Zustand** - Estado global
- **Embla Carousel** - Carrosséis

---

## 🚀 Getting Started

### Pré-requisitos

- Node.js 18+
- pnpm (ou npm/yarn)
- [TMDB API Key](https://www.themoviedb.org/settings/api)

### Instalação

```bash
# Clone o repositório
git clone https://github.com/anthony-reis/mbc-play.git
cd mbc-play

# Instale as dependências
pnpm install

# Configure o .env.local
NEXT_PUBLIC_TMDB_API_KEY=sua_chave_api

# Execute
pnpm dev
```

Acesse http://localhost:3000

---

## 📂 Estrutura

```text
mbc-play/
├── app/                    # Rotas (App Router)
│   ├── (explorar)/        # Homepage
│   ├── filmes/
│   ├── series/
│   └── genre/
├── components/
│   ├── ui/                # shadcn/ui components
│   ├── layout/            # Header, Sidebar
│   └── shared/            # Componentes reutilizáveis
│       └── media/         # Cards, Hero, Info
├── services/      # Movie, Show, Genre
├── hooks/         # Custom hooks
├── lib/
│   ├── tmdb/              # API Integration
│   │   └── queries/
│   └── stores/            # Zustand
├── types/                 # TypeScript definitions
└── providers/             # React Context
```

---

## 📜 Scripts

```bash
pnpm dev       # Desenvolvimento
pnpm build     # Build de produção
pnpm start     # Servidor de produção
pnpm lint      # Linting
```

---

## 🔌 API

| Serviço        | Descrição                            |
| -------------- | ------------------------------------ |
| movie-service  | Filmes populares, upcoming, trending |
| show-service   | Séries de TV                         |
| genre-service  | Gêneros e filtros                    |
| search-service | Busca de conteúdo                    |

---

## 📄 Licença

MIT License - veja LICENSE

---

## 👨‍💻 Autor

**Anthony Reis**

GitHub: [@anthony-reis](https://github.com/anthony-reis)

---
