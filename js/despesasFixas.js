/**
 * Busca as despesas fixas na API e desenha os cards na tela.
 */
async function carregarDespesasFixas() {
  const lista = document.getElementById("lista-despesas-fixas");
  lista.innerHTML = "<p>Carregando...</p>";
  try {
    await preencherSelectCategorias(document.getElementById("despesa-categoria"));
    const despesas = await Api.listarDespesasFixas();
    lista.innerHTML = "";
    despesas.forEach((despesa) => lista.appendChild(criarCardDespesaFixa(despesa)));
  } catch (erro) {
    lista.innerHTML = `<p>Não foi possível carregar as despesas fixas: ${erro.message}</p>`;
  }
}

function criarCardDespesaFixa(despesa) {
  const card = document.createElement("div");
  card.className = "card";
  card.innerHTML = `
    <strong>${escapeHtml(despesa.descricao)}</strong>
    <p>R$ ${despesa.valor.toFixed(2)} — todo dia ${despesa.dia_vencimento}</p>
    <label style="display:flex; align-items:center; gap:6px;">
      <input type="checkbox" ${despesa.ativo ? "checked" : ""} />
      Ativa
    </label>
    <button class="botao--perigo" type="button">Remover</button>
  `;
  card.querySelector('input[type="checkbox"]').addEventListener("change", (evento) =>
    alternarAtivo(despesa, evento.target.checked)
  );
  card.querySelector("button").addEventListener("click", () => removerDespesaFixa(despesa.id));
  return card;
}

async function alternarAtivo(despesa, ativo) {
  try {
    await Api.atualizarDespesaFixa(despesa.id, { ...despesa, ativo });
    mostrarToast(ativo ? "Despesa fixa ativada." : "Despesa fixa desativada.");
  } catch (erro) {
    mostrarToast(erro.message, "erro");
  }
}

async function removerDespesaFixa(id) {
  try {
    await Api.removerDespesaFixa(id);
    mostrarToast("Despesa fixa removida.");
    carregarDespesasFixas();
  } catch (erro) {
    mostrarToast(erro.message, "erro");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("form-despesa-fixa").addEventListener("submit", async (evento) => {
    evento.preventDefault();
    const dados = {
      descricao: document.getElementById("despesa-descricao").value,
      valor: parseFloat(document.getElementById("despesa-valor").value),
      dia_vencimento: parseInt(document.getElementById("despesa-dia").value, 10),
      categoria_id: parseInt(document.getElementById("despesa-categoria").value, 10),
      ativo: true,
    };
    try {
      await Api.criarDespesaFixa(dados);
      evento.target.reset();
      mostrarToast("Despesa fixa criada.");
      carregarDespesasFixas();
    } catch (erro) {
      mostrarToast(erro.message, "erro");
    }
  });

  document.getElementById("botao-gerar-fixas").addEventListener("click", async () => {
    try {
      const resultado = await Api.gerarFixasDoMes();
      mostrarToast(`${resultado.geradas} lançamento(s) gerado(s) para o mês.`);
    } catch (erro) {
      mostrarToast(erro.message, "erro");
    }
  });
});

CarregadoresDeView["despesas-fixas"] = carregarDespesasFixas;
