let contextoAtual = 'geral';
let dbCores = [];
let logicaCudc = {};

// Função para carregar os dados dos JSONs
async function inicializar() {
    try {
        // Buscamos os dados voltando um nível (../) para achar a pasta dados na raiz
        const [resCudc, resCores] = await Promise.all([
            fetch('./dados/config_logica_cudc.json'), 
            fetch('./dados/db_cores_acessibilidade.json')
        ]);

        // Se o fetch acima falhar, tentamos o caminho sem o ponto (ajuste para GitHub Pages)
        if (!resCudc.ok || !resCores.ok) {
            throw new Error("Erro ao carregar arquivos");
        }
        
        const dataLogica = await resCudc.json();
        logicaCudc = dataLogica.config_logica_cudc;
        
        const dataCores = await resCores.json();
        dbCores = dataCores.db_cores_acessibilidade;
        
        renderizarBotoes();
        console.log("Croma: Dados carregados com sucesso.");
    } catch (e) {
        console.error("Erro no Croma:", e);
        // Tentativa de fallback para o caminho relativo comum
        tentarCaminhoAlternativo();
    }
}

async function tentarCaminhoAlternativo() {
    try {
        const resCudc = await fetch('../dados/config_logica_cudc.json');
        const resCores = await fetch('../dados/db_cores_acessibilidade.json');
        const dataLogica = await resCudc.json();
        logicaCudc = dataLogica.config_logica_cudc;
        const dataCores = await resCores.json();
        dbCores = dataCores.db_cores_acessibilidade;
        renderizarBotoes();
    } catch (err) {
        document.getElementById('displayResultado').innerText = "Erro ao carregar banco de dados. Verifique a pasta /dados.";
    }
}

// Expõe a função para o HTML
window.definirContexto = (modo) => {
    contextoAtual = modo;
    const nomes = { geral: "Geral", moda: "Moda e Produtos", decoracao: "Arquitetura e Interiores" };
    document.getElementById('status-contexto').innerText = `Modo atual: ${nomes[modo]}`;
    document.getElementById('displayResultado').innerText = "Objetivo atualizado. Agora escolha uma cor abaixo.";
};

function renderizarBotoes() {
    const container = document.getElementById('containerBotoes');
    container.innerHTML = ""; // Limpa antes de renderizar
    
    dbCores.forEach(cor => {
        const btn = document.createElement('button');
        btn.innerText = cor.nome_da_cor;
        btn.className = 'btn-cor';
        btn.setAttribute('aria-label', `Ver detalhes da cor ${cor.nome_da_cor}`);
        btn.onclick = () => exibirFicha(cor);
        container.appendChild(btn);
    });
}

function exibirFicha(cor) {
    const display = document.getElementById('displayResultado');
    
    // Busca os pontos Braille (CUdC)
    const nomeBusca = cor.nome_da_cor.toLowerCase();
    const pontos = logicaCudc["4_formacao_cores_secundarias"][nomeBusca] || 
                   logicaCudc["2_mapeamento_cores_primarias"][nomeBusca] || 
                   "Verificar manual técnico";

    let html = `<h2>Especificação: ${cor.nome_da_cor}</h2>`;
    
    // Parte Técnica: Braille (Útil para etiquetas)
    html += `<p><strong>Código Braille (CUdC):</strong> Precedente ${logicaCudc["1_codigo_precedente_obrigatorio"].caractere_braille} (pontos ${logicaCudc["1_codigo_precedente_obrigatorio"].pontos}) + pontos ${pontos}.</p>`;
    
    html += `<hr>`;

    // Conteúdo Dinâmico baseado no Contexto
    if (contextoAtual === 'moda') {
        html += `<p><strong>Aplicação em Produtos/Moda:</strong> ${cor.dica_design_produtos_moda}</p>`;
    } else if (contextoAtual === 'decoracao') {
        html += `<p><strong>Uso em Arquitetura/Interiores:</strong> ${cor.dica_design_interiores_decoracao}</p>`;
    } else {
        html += `<p><strong>Psicologia:</strong> ${cor.significado_psicologico_e_ideia}</p>`;
        html += `<p><strong>Referências Reais:</strong> ${cor.referencias_fisicas_mundo_real}</p>`;
        html += `<p><strong>Sensação Tátil:</strong> ${cor.associacao_de_textura}</p>`;
    }

    display.innerHTML = html;
    // Garante que o leitor de tela foque no resultado
    display.focus();
}

document.addEventListener('DOMContentLoaded', inicializar);