/**
 * Busca o resumo do mês atual na API e desenha o dashboard com saldo,
 * barra fixo x eventual, e cards por categoria.
 */
async function carregarDashboard() {
  const hoje = new Date();
  try {
    const resumo = await Api.buscarResumo(hoje.getMonth() + 1, hoje.getFullYear());
    renderizarSaldo(resumo);
    renderizarBarraFixoEventual(resumo);
    renderizarCategorias(resumo);
  } catch (erro) {
    mostrarToast(erro.message, "erro");
    document.getElementById("resumo-categorias").innerHTML = "<p>Não foi possível carregar o resumo.</p>";
  }
}

function renderizarSaldo(resumo) {
  const elemento = document.getElementById("valor-saldo");
  elemento.textContent = `R$ ${resumo.saldo.toFixed(2)}`;
  elemento.style.color = resumo.saldo >= 0 ? "var(--cor-receita)" : "var(--cor-despesa)";
}

function renderizarBarraFixoEventual(resumo) {
  const total = resumo.total_fixo + resumo.total_eventual;
  const percentualFixo = total > 0 ? (resumo.total_fixo / total) * 100 : 0;
  document.getElementById("barra-fixo").style.width = `${percentualFixo}%`;
  document.getElementById("legenda-fixo-eventual").textContent =
    `Fixo: R$ ${resumo.total_fixo.toFixed(2)} · Eventual: R$ ${resumo.total_eventual.toFixed(2)}`;
}

function renderizarCategorias(resumo) {
  const container = document.getElementById("resumo-categorias");
  container.innerHTML = "";
  resumo.por_categoria.forEach((item) => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `<strong>${escapeHtml(item.categoria)}</strong><p>R$ ${item.total.toFixed(2)}</p>`;
    container.appendChild(card);
  });
}

CarregadoresDeView.dashboard = carregarDashboard;
