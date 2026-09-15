# Teste de Voto PT ⚡

Uma aplicação interativa com estética sci-fi/futurista e minimalista inspirada no clássico trilema político humorístico brasileiro:

> **"Vota no PT, é inteligente ou é honesto — escolha apenas duas."**

O projeto é focado em alta performance, Server-Side Rendering (SSR) pronto para SEO e uma experiência de usuário limpa e fluida.

---

## 💡 A Ideia do Projeto

A aplicação apresenta uma interface minimalista com tipografia elegante e três seletores de atributos:
1. **Vota no PT** (inicia marcado por padrão)
2. **É inteligente**
3. **É honesto**

### Regras da Lógica:
- **Limite de Parâmetros**: É permitido selecionar **no máximo 2 opções** simultaneamente.
- **Resolução do Paradoxo**: Caso 2 opções estejam marcadas e o usuário tente marcar a terceira, a **última opção marcada anteriormente é automaticamente desmarcada**, mantendo sempre no máximo 2 ativas.
- **Frase Dinâmica**:
  - Inicial: `"Vota no PT e ..."`
  - Ao marcar uma segunda opção: `"Vota no PT e +{opção_ativada}, mas não +{opção_desativada}"`
    - *Exemplo 1*: `"Vota no PT e é inteligente, mas não é honesto."`
    - *Exemplo 2*: `"Vota no PT e é honesto, mas não é inteligente."`
  - Se o usuário desmarcar *Vota no PT* e marcar as outras duas: `"É inteligente e é honesto, mas não vota no PT."`

---

## 🛠️ Tecnologias e Bibliotecas Utilizadas

- **[TanStack Start](https://tanstack.com/start)**: Framework fullstack React que fornece SSR nativo (Server-Side Rendering), garantindo que o HTML completo seja pré-renderizado no servidor para máxima pontuação de SEO e indexação instantânea.
- **[TanStack Router](https://tanstack.com/router)**: Sistema de roteamento moderno com tipagem estrita de ponta a ponta (type-safe routing).
- **[React 19](https://react.dev/)**: Versão mais recente do ecossistema React para interfaces declarativas e componentes reativos.
- **[Bun](https://bun.sh/)**: Runtime e gerenciador de pacotes ultrarrápido utilizado para gerenciar dependências, executar scripts e o servidor de desenvolvimento.
- **[Biome](https://biomejs.dev/)**: Toolchain de altíssima performance para linting e formatação de código, substituindo ESLint e Prettier com velocidade instantânea.
- **[Tailwind CSS v4](https://tailwindcss.com/)**: Motor de estilização moderno e otimizado com variáveis CSS dinâmicas e suporte direto ao Vite.
- **[Vite 8](https://vitejs.dev/)**: Ferramenta de build de última geração com Hot Module Replacement (HMR) ultrarrápido.

---

## 🚀 Como Executar Localmente

### Pré-requisitos
- [Bun](https://bun.sh/) (v1.0+) instalado.

### 1. Clonar o repositório
```bash
git clone https://github.com/levigleik/teste-de-voto-no-pt.git
cd teste-de-voto-no-pt
```

### 2. Instalar dependências
```bash
bun install
```

### 3. Executar o servidor de desenvolvimento
```bash
bun run dev
```
Acesse a aplicação no navegador em [http://localhost:3000](http://localhost:3000).

---

## 📦 Scripts Disponíveis

- `bun run dev`: Inicia o servidor local de desenvolvimento na porta 3000.
- `bun run build`: Compila a aplicação para produção (gera os bundles de cliente e SSR em `dist/`).
- `bun run preview`: Pré-visualiza a build de produção localmente.
- `bun run check`: Executa o linter e o verificador de formatação do Biome.
- `bun run format`: Aplica formatação automática em todos os arquivos com Biome.

---

## 📄 Licença
Distribuído sob a licença MIT.
