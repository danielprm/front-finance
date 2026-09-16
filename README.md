# Meu Dinheiro — Front-end

Interface web (SPA) do MVP de controle de gastos pessoais com despesas fixas recorrentes. Construída em HTML, CSS e JavaScript puro (sem frameworks), como parte do MVP da disciplina de Desenvolvimento Full Stack Básico.

## Funcionalidades

- **Dashboard**: saldo do mês, indicador de gastos fixos x eventuais e totais por categoria.
- **Lançamentos**: cadastro e listagem de despesas/receitas manuais do mês.
- **Despesas Fixas**: cadastro de despesas recorrentes e geração automática dos lançamentos do mês.
- **Categorias**: cadastro e remoção de categorias de gastos.

## Tecnologias

- HTML5, CSS3 (estilização 100% autoral, sem frameworks de CSS)
- JavaScript vanilla (sem bibliotecas ou frameworks de SPA)

## Como executar

Este front-end **não precisa de instalação nem de servidor local** — é um conjunto de arquivos estáticos.

1. Certifique-se de que a API (repositório `back-finance`) está rodando em `http://127.0.0.1:5000`.
2. Abra o arquivo `index.html` diretamente no navegador (duplo clique, ou "Abrir arquivo" no navegador).

## Estrutura

```
front-finance/
├── index.html          # Estrutura da SPA e navegação entre telas
├── css/
│   └── styles.css       # Estilos (paleta, layout, componentes)
└── js/
    ├── app.js            # Navegação entre telas e notificações (toasts)
    ├── api.js             # Chamadas HTTP para a API
    ├── categorias.js      # Tela de Categorias
    ├── despesasFixas.js   # Tela de Despesas Fixas
    ├── lancamentos.js      # Tela de Lançamentos
    └── dashboard.js        # Tela de Dashboard
```
