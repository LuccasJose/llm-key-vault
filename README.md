<div align="center">
<h1>LLM Key Vault</h1>
</div>

## Visão Geral

`LLM Key Vault` é uma aplicação frontend em React + Vite para gerenciar chaves e testar integrações com APIs de modelos (ex.: Gemini). O projeto está em fase de testes e desenvolvimento — use com cuidado em produção.

Funcionalidades principais (fase de testes):
- Gerador/visualização de chaves (componente `Generator`).
- Cartões de chave reutilizáveis (`KeyCard`).
- Tela de login de desenvolvimento (`Login`).
- Gráficos de estatísticas (`StatsChart`).

Estrutura de pastas principal:

- `App.tsx` — entrada principal da aplicação.
- `index.tsx` — bootstrap do React.
- `index.html` — template HTML usado pelo Vite.
- `components/` — componentes React (`Generator.tsx`, `KeyCard.tsx`, `Login.tsx`, `StatsChart.tsx`).
- `services/geminiService.ts` — serviço para comunicação com a API do modelo (ex.: Gemini).
- `constants.ts`, `types.ts` — definições de tipos e constantes.
- `vite.config.ts`, `tsconfig.json` — configuração do build/TypeScript.

## Estado do Projeto

Esta aplicação está em **fase de testes**:
- Algumas funções podem ser incompletas ou mockadas.
- Não armazene chaves sensíveis em repositórios públicos.
- Testes manuais e validações adicionais são recomendados antes de qualquer deploy.

## Pré-requisitos

- Node.js (recomendado LTS >= 18)
- Git (para controle de versão)

## Executando localmente (desenvolvimento)

1. Instale dependências:

```powershell
cd 'c:\Users\lucca\OneDrive\Desktop\aplicação meio foda'
npm install
```

2. Configure variáveis de ambiente (exemplo `.env.local` na raiz):

```text
# Exemplo de .env.local (NUNCA comitar chaves reais)
GEMINI_API_KEY=your_gemini_api_key_here
```

3. Rode o servidor de desenvolvimento:

```powershell
npm run dev
```

4. Abra no navegador em `http://localhost:3000/` (ou a porta indicada pelo Vite).

## Build para produção

```powershell
npm run build
npm run preview
```

`npm run build` gera os arquivos otimizados em `dist/`. Use `npm run preview` para servir a build localmente.

## Exemplos de uso / Fluxos de teste

- Gerar chave localmente: abra a tela de `Generator` e clique em "Gerar" (ou comando equivalente no UI).
- Testar requisição ao modelo: garanta que `GEMINI_API_KEY` esteja definida e use os formulários no UI que acionam `services/geminiService.ts`.
- Visualizar estatísticas: abra a tela `StatsChart` para ver dados de uso (pode estar usando dados mock).

## Segurança e boas práticas

- Nunca comite arquivos `.env` ou chaves de API. `.gitignore` já inclui `*.env`.
- Para produção, use segredos do provedor de hospedagem (Vercel, Netlify, GitHub Actions Secrets).
- Limite o escopo das chaves e monitore uso anômalo.

## Deploy

Sugestões de deploy rápido:

- Vercel: basta conectar o repositório GitHub; Vercel detecta Vite e fará build automaticamente.
- Netlify: configurar build command `npm run build` e publish `dist`.

## Contribuindo / Issues

- Abra issues no repositório para bugs e features.
- Para mudanças, faça forks/branches e envie PRs; siga o padrão `chore/feat/fix` nas mensagens de commit.
