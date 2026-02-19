import { categorias } from '../dados/db_cores_acessibilidade.json' assert { type: 'json' }; 
// Nota: Se usar o fetch como abaixo, é mais compatível com navegadores modernos:

let contextoAtual = 'geral';
let dbCores = [];
let logicaCudc = {};

async function inicializar() {
    try {
        const [resCudc, resCores] = await Promise.all([
            fetch('./dados/config_logica_cudc.json'),
            fetch('./dados/db_cores_acessibilidade.json')
        ]);
        
        logicaCudc = await resCudc.json();
        const data = await resCores.json();
        dbCores = data.db_cores_acessibilidade;
        
        renderizarBotoes();
    } catch (e) {
        console.error("Erro ao carregar dados:", e);
    }
}

window.definirContexto = (modo) => {
    contextoAtual = modo;
    document.getElementById('status-contexto').innerText = `Modo atual: ${modo.charAt(0).toUpperCase() + modo.slice(1)}`;
};

function renderizarBotoes() {
    const container = document.getElementById('containerBotoes');
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
    const log = logicaCudc.config_logica_cudc;
    
    // Busca os pontos Braille na lógica do CUdC [cite: 62, 305]
    const nomeBusca = cor.nome_da_cor.toLowerCase();
    const pontos = log["4_formacao_cores_secundarias"][nomeBusca] || 
                   log["2_mapeamento_cores_primarias"][nomeBusca] || "Consultar manual";

    let html = `<h2>${cor.nome_da_cor}</h2>`;
    html += `<p><strong>Código Braille (CUdC):</strong> Precedente ${log["1_codigo_precedente_obrigatorio"].caractere_braille} (${log["1_codigo_precedente_obrigatorio"].pontos}) + ${pontos}</p>`;
    
    if (contextoAtual === 'moda') {
        html += `<hr><p><strong>Uso em Produtos/Moda:</strong> ${cor.dica_design_produtos_moda}</p>`;
    } else if (contextoAtual === 'decoracao') {
        html += `<hr><p><strong>Arquitetura/Interiores:</strong> ${cor.dica_design_interiores_decoracao}</p>`;
    } else {
        html += `<hr><p><strong>Ideia Central:</strong> ${cor.significado_psicologico_e_ideia}</p>`;
        html += `<p><strong>Referências Reais:</strong> ${cor.referencias_fisicas_mundo_real}</p>`;
        html += `<p><strong>Textura e Tato:</strong> ${cor.associacao_de_textura}</p>`;
    }

    display.innerHTML = html;
}

document.addEventListener('DOMContentLoaded', inicializar);