# Instruções para Agentes

## Tipo de Projeto
Site estático puro (HTML/CSS/JS). Sem build, sem gerenciador de pacotes, sem testes.

## Arquivos Principais
- `index.html` — página principal
- `css/style.css` — folha de estilos única
- `js/main.js` — carrega `data/repos.json` e renderiza os cards de projetos
- `data/repos.json` — dados dos repositórios **gerados automaticamente** (não editar manualmente)
- `scripts/fetch_repos.py` — script que consome a API do GitHub e gera `data/repos.json`

## Fluxo de Dados (Importante)
O arquivo `data/repos.json` é gerado automaticamente.

- **Atualização local:** `python scripts/fetch_repos.py` (sobrescreve `data/repos.json`)
- **No CI:** o workflow `.github/workflows/update-repos.yml` roda manualmente (`workflow_dispatch`). Ele gera uma nova branch, commita o `repos.json` atualizado e **abre um Pull Request automaticamente**. Você precisa revisar e fazer o merge do PR. O bot `github-actions[bot]` não polui o histórico da `main`.
- **Não edite `data/repos.json` diretamente** — as mudanças serão perdidas no próximo fetch.

## Deploy
Push na branch `main` dispara automaticamente o `.github/workflows/deploy-pages.yml`, que publica a raiz do repositório no GitHub Pages. Não há etapa de build.

## Observações
- A seção Projects fica vazia se `data/repos.json` estiver ausente ou malformado. Sempre commitar esse arquivo.
- `js/main.js` ordena os repositórios por `stargazers_count` (decrescente) antes de renderizar.
- Assets externos: Google Fonts (Inter), imagem de avatar do GitHub.
