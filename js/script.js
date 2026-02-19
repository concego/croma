/**
 * CROMA - Motor de Acessibilidade
 * Mantendo a separação entre Lógica, Dados e Interface.
 */

let contextoAtual = 'geral';
let dbCores = [];
let logicaCudc = {};

async function inicializar() {
    try {
        // Usamos caminhos relativos à raiz do projeto para garantir que o GitHub Pages encontre
        const [resCudc, resCores] = await Promise.all([
            fetch('./dados/config_logica_cudc.json'),
            fetch('./dados/db_cores_acessibilidade.json')
        ]);

        if (!resCudc.ok || !resCores.ok) {
            throw new Error(`Falha no carregamento: ${resCudc.status} / ${resCores.status}`);
        }

        const dataLogica = await resCudc.json();
        logicaCudc = dataLogica.config_logica_cudc;

        const dataCores = await resCores.json();
        dbCores = dataCores.db_cores_acessibilidade;

        renderizarBotoes();
        console.log("Croma: Sistema de dados híbrido carregado com sucesso.");
    } catch (e) {
        console.error("Erro crítico no Croma:", e);
        document.getElementById('displayResultado').innerHTML = "<b>Erro técnico:</b> Não foi possível carregar os bancos de dados JSON.";
    }
}

// Funções globais para interação com o HTML
window.definirContexto = (modo) => {
    contextoAtual = modo;
    const labels = { geral: "Geral", moda: "Moda e Produtos", decoracao: "Arquitetura" };
    document.getElementById('status-contexto').innerText = `Modo atual: ${labels[modo]}`;
};

function renderizarBotoes() {
    const container = document.getElementById('containerBotoes');
    container.innerHTML = ""; 

    dbCores.forEach(cor => {
        const btn = document.createElement('button');
        btn.innerText = cor.nome_da_cor;
        btn.className = 'btn-cor';
        btn.onclick = () => exibirFicha(cor);
        container.appendChild(btn);
    });
}

function exibirFicha(cor) {
    const display = document.getElementById('displayResultado');
    const log = logicaCudc;

    const nomeBusca = cor.nome_da_cor.toLowerCase();
    const pontos = log["4_formacao_cores_secundarias"][nomeBusca] || 
                   log["2_mapeamento_cores_primarias"][nomeBusca] || "Consultar Manual";

    let html = `<h2>${cor.nome_da_cor}</h2>`;
    html += `<p><strong>Código Braille (CUdC):</strong> ${log["1_codigo_precedente_obrigatorio"].caractere_braille} (pontos ${log["1_codigo_precedente_obrigatorio"].pontos}) + pontos ${pontos}</p>`;
    html += `<hr>`;

    if (contextoAtual === 'moda') {
        html += `<p><strong>Foco em Produtos:</strong> ${cor.dica_design_produtos_moda}</p>`;
    } else if (contextoAtual === 'decoracao') {
        html += `<p><strong>Foco em Interiores:</strong> ${cor.dica_design_interiores_decoracao}</p>`;
    } else {
        html += `<p><strong>Significado:</strong> ${cor.significado_psicologico_e_ideia}</p>`;
        html += `<p><strong>Referências:</strong> ${cor.referencias_fisicas_mundo_real}</p>`;
        html += `<p><strong>Textura/Tato:</strong> ${cor.associacao_de_textura}</p>`;
    }

    display.innerHTML = html;
}

document.addEventListener('DOMContentLoaded', inicializar);