/**
 * Registro das funções de carregamento inicial de cada tela.
 * Cada arquivo de tela (categorias.js, despesasFixas.js, etc.) adiciona
 * sua própria entrada aqui; assim app.js não precisa conhecer as telas.
 */
const CarregadoresDeView = {};

/**
 * Alterna a tela visível da SPA, escondendo as demais.
 * Usa o atributo data-view em cada <section> e nos botões de navegação
 * em vez de um roteador: só mostra/esconde blocos do DOM.
 *
 * Arguments:
 *   nomeView: identificador da tela (mesmo valor usado em data-view/data-nav).
 */
function mostrarView(nomeView) {
  document.querySelectorAll("[data-view]").forEach((secao) => {
    secao.hidden = secao.dataset.view !== nomeView;
  });
  document.querySelectorAll("[data-nav]").forEach((botao) => {
    botao.classList.toggle("ativo", botao.dataset.nav === nomeView);
  });
  const carregar = CarregadoresDeView[nomeView];
  if (carregar) carregar();
}

/**
 * Mostra uma notificação temporária no canto da tela, no lugar de
 * alert()/confirm() do navegador.
 *
 * Arguments:
 *   mensagem: texto exibido na notificação.
 *   tipo: "sucesso" (padrão) ou "erro", usado para colorir a notificação.
 */
function mostrarToast(mensagem, tipo = "sucesso") {
  const container = document.getElementById("toast-container");
  const toast = document.createElement("div");
  toast.className = `toast toast--${tipo}`;
  toast.textContent = mensagem;
  container.appendChild(toast);
  setTimeout(() => toast.remove(), 3000);
}

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("[data-nav]").forEach((botao) => {
    botao.addEventListener("click", () => mostrarView(botao.dataset.nav));
  });
  mostrarView("dashboard");
});
