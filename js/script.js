let contextoAtual = 'geral';
let dbCores = [];
let logicaCudc = {};

async function inicializar() {
    try {
        // Busca os arquivos JSON na pasta dados
        const [resCudc, resCores] = await Promise.all([
            fetch('dados/config_logica_cudc.json'),
            fetch('dados/db_cores_acessibilidade.json')
        ]);

        if (!resCudc.ok) throw new Error("Não foi possível encontrar os arquivos JSON na pasta /dados.");

        const dataLogica = await resCudc.json();
        logicaCudc = dataLogica.config_logica_cudc;

        const dataCores = await resCores.json();
        dbCores = dataCores.db_cores_acessibilidade;

        renderizarBotoes();
        console.log("Croma: Dados carregados com sucesso!");
    } catch (e) {
        console.error("Erro no Croma:", e);
        document.getElementById('displayResultado').innerHTML = 
            `<p style="color:red"><b>Erro de Carregamento:</b> ${e.message}</p>`;
    }
}

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
    const nomeBusca = cor.nome_da_cor.toLowerCase();
    
    // Lógica para mapear os nomes das cores aos pontos do seu config_logica_cudc.json
    let pontosInfo = "";
    
    if (nomeBusca.includes("amarelo")) {
        pontosInfo = logicaCudc["2_mapeamento_cores_primarias"]["amarelo"];
    } else if (nomeBusca.includes("vermelho")) {
        pontosInfo = logicaCudc["2_mapeamento_cores_primarias"]["vermelho"];
    } else if (nomeBusca.includes("azul")) {
        pontosInfo = logicaCudc["2_mapeamento_cores_primarias"]["azul"];
    } else if (nomeBusca.includes("laranja")) {
        pontosInfo = logicaCudc["4_formacao_cores_secundarias"]["laranja"];
    } else if (nomeBusca.includes("verde")) {
        pontosInfo = logicaCudc["4_formacao_cores_secundarias"]["verde"];
    } else if (nomeBusca.includes("roxo") || nomeBusca.includes("violeta")) {
        pontosInfo = logicaCudc["4_formacao_cores_secundarias"]["roxo_violeta"];
    } else {
        pontosInfo = "Consultar manual técnico para esta tonalidade.";
    }

    let html = `<h2>${cor.nome_da_cor}</h2>`;
    
    // Exibe o caractere e os pontos do código precedente
    const prec = logicaCudc["1_codigo_precedente_obrigatorio"];
    html += `<p><strong>Código Braille (CUdC):</strong> Precedente ${prec.caractere_braille} (pontos ${prec.pontos}) + ${pontosInfo}</p>`;
    
    html += `<hr>`;

    if (contextoAtual === 'moda') {
        html += `<p><strong>Dica para Moda/Produtos:</strong> ${cor.dica_design_produtos_moda}</p>`;
    } else if (contextoAtual === 'decoracao') {
        html += `<p><strong>Dica para Arquitetura/Interiores:</strong> ${cor.dica_design_interiores_decoracao}</p>`;
    } else {
        html += `<p><strong>Psicologia e Ideia:</strong> ${cor.significado_psicologico_e_ideia}</p>`;
        html += `<p><strong>Referências no Mundo Real:</strong> ${cor.referencias_fisicas_mundo_real}</p>`;
        html += `<p><strong>Associação Tátil/Textura:</strong> ${cor.associacao_de_textura}</p>`;
    }

    display.innerHTML = html;
}

document.addEventListener('DOMContentLoaded', inicializar);