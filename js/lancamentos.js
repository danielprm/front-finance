/**
 * Busca os lançamentos do mês atual na API e desenha os cards na tela.
 */
async function carregarLancamentos() {
  const lista = document.getElementById("lista-transacoes");
  lista.innerHTML = "<p>Carregando...</p>";
  await preencherSelectCategorias(document.getElementById("transacao-categoria"));
  const hoje = new Date();
  try {
    const transacoes = await Api.listarTransacoes(hoje.getMonth() + 1, hoje.getFullYear());
    lista.innerHTML = "";
    transacoes.forEach((transacao) => lista.appendChild(criarCardTransacao(transacao)));
  } catch (erro) {
    lista.innerHTML = `<p>Não foi possível carregar os lançamentos: ${erro.message}</p>`;
  }
}

function criarCardTransacao(transacao) {
  const card = document.createElement("div");
  card.className = "card";
  const sinal = transacao.tipo === "receita" ? "+" : "-";
  const corValor = transacao.tipo === "receita" ? "var(--cor-receita)" : "var(--cor-despesa)";
  card.innerHTML = `
    <strong>${escapeHtml(transacao.descricao)}</strong>
    <p style="color:${corValor}">${sinal} R$ ${transacao.valor.toFixed(2)}</p>
    <small>${transacao.data}${transacao.despesa_fixa_id ? " · fixa" : ""}</small>
    <div style="margin-top:8px; display:flex; gap:8px;">
      <button class="botao--secundario" type="button" data-acao="detalhes">Detalhes</button>
      <button class="botao--perigo" type="button" data-acao="remover">Remover</button>
    </div>
  `;
  card.querySelector('[data-acao="detalhes"]').addEventListener("click", () => verDetalhesTransacao(transacao.id));
  card.querySelector('[data-acao="remover"]').addEventListener("click", () => removerTransacao(transacao.id));
  return card;
}

async function verDetalhesTransacao(id) {
  try {
    const transacao = await Api.buscarTransacao(id);
    mostrarToast(`${transacao.descricao}: R$ ${transacao.valor.toFixed(2)} em ${transacao.data}`);
  } catch (erro) {
    mostrarToast(erro.message, "erro");
  }
}

async function removerTransacao(id) {
  try {
    await Api.removerTransacao(id);
    mostrarToast("Lançamento removido.");
    carregarLancamentos();
  } catch (erro) {
    mostrarToast(erro.message, "erro");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("form-transacao").addEventListener("submit", async (evento) => {
    evento.preventDefault();
    const dados = {
      descricao: document.getElementById("transacao-descricao").value,
      valor: parseFloat(document.getElementById("transacao-valor").value),
      tipo: document.getElementById("transacao-tipo").value,
      data: document.getElementById("transacao-data").value,
      categoria_id: parseInt(document.getElementById("transacao-categoria").value, 10),
    };
    try {
      await Api.criarTransacao(dados);
      evento.target.reset();
      mostrarToast("Lançamento criado.");
      carregarLancamentos();
    } catch (erro) {
      mostrarToast(erro.message, "erro");
    }
  });
});

CarregadoresDeView.lancamentos = carregarLancamentos;
