/**
 * Busca as categorias na API e desenha os cards na tela.
 */
async function carregarCategorias() {
  const lista = document.getElementById("lista-categorias");
  lista.innerHTML = "<p>Carregando...</p>";
  try {
    const categorias = await Api.listarCategorias();
    lista.innerHTML = "";
    categorias.forEach((categoria) => lista.appendChild(criarCardCategoria(categoria)));
  } catch (erro) {
    lista.innerHTML = `<p>Não foi possível carregar as categorias: ${erro.message}</p>`;
  }
}

function criarCardCategoria(categoria) {
  const card = document.createElement("div");
  card.className = "card";
  card.innerHTML = `
    <span class="chip" style="background:${categoria.cor}">${categoria.nome}</span>
    <div style="margin-top:12px; display:flex; gap:8px;">
      <button class="botao--secundario" type="button" data-acao="detalhes">Detalhes</button>
      <button class="botao--perigo" type="button" data-acao="remover">Remover</button>
    </div>
  `;
  card.querySelector('[data-acao="detalhes"]').addEventListener("click", () => verDetalhesCategoria(categoria.id));
  card.querySelector('[data-acao="remover"]').addEventListener("click", () => removerCategoria(categoria.id));
  return card;
}

async function verDetalhesCategoria(id) {
  try {
    const categoria = await Api.buscarCategoria(id);
    mostrarToast(`${categoria.nome} — cor ${categoria.cor}`);
  } catch (erro) {
    mostrarToast(erro.message, "erro");
  }
}

async function removerCategoria(id) {
  try {
    await Api.removerCategoria(id);
    mostrarToast("Categoria removida.");
    carregarCategorias();
  } catch (erro) {
    mostrarToast(erro.message, "erro");
  }
}

/**
 * Preenche um <select> com as categorias cadastradas.
 * Reaproveitado pelas telas de Despesas Fixas e Lançamentos, que também
 * precisam de um seletor de categoria nos formulários.
 *
 * Arguments:
 *   selectEl: elemento <select> a ser preenchido.
 */
async function preencherSelectCategorias(selectEl) {
  const categorias = await Api.listarCategorias();
  selectEl.innerHTML = categorias
    .map((categoria) => `<option value="${categoria.id}">${categoria.nome}</option>`)
    .join("");
}

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("form-categoria").addEventListener("submit", async (evento) => {
    evento.preventDefault();
    const nome = document.getElementById("categoria-nome").value;
    const cor = document.getElementById("categoria-cor").value;
    try {
      await Api.criarCategoria({ nome, cor });
      evento.target.reset();
      mostrarToast("Categoria criada.");
      carregarCategorias();
    } catch (erro) {
      mostrarToast(erro.message, "erro");
    }
  });
});

CarregadoresDeView.categorias = carregarCategorias;
