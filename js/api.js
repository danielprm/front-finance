const API_BASE_URL = "http://127.0.0.1:5000";

/**
 * Executa uma requisição HTTP para a API e devolve o corpo já convertido
 * em JSON. Centraliza o tratamento de erro para não repetir o mesmo
 * try/catch em cada tela.
 *
 * Arguments:
 *   caminho: caminho da rota, ex: "/categorias".
 *   opcoes: opções repassadas para fetch() (method, body, etc).
 */
async function apiRequest(caminho, opcoes = {}) {
  const resposta = await fetch(`${API_BASE_URL}${caminho}`, {
    headers: { "Content-Type": "application/json" },
    ...opcoes,
  });
  if (!resposta.ok) {
    const erro = await resposta.json().catch(() => ({}));
    throw new Error(erro.message || `Erro ${resposta.status} ao chamar ${caminho}`);
  }
  if (resposta.status === 204) return null;
  return resposta.json();
}

const Api = {
  listarCategorias: () => apiRequest("/categorias"),
  buscarCategoria: (id) => apiRequest(`/categorias/${id}`),
  criarCategoria: (dados) => apiRequest("/categorias", { method: "POST", body: JSON.stringify(dados) }),
  removerCategoria: (id) => apiRequest(`/categorias/${id}`, { method: "DELETE" }),
};
