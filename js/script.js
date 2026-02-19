let contextoAtual = 'geral';
let dbCores = [];
let logicaCudc = {};

async function inicializar() {
    try {
        // Buscamos os dados partindo da raiz onde o index.html está
        const [resCudc, resCores] = await Promise.all([
            fetch('dados/config_logica_cudc.json'),
            fetch('dados/db_cores_acessibilidade.json')
        ]);

        if (!resCudc.ok) throw new Error(`Erro 404: Arquivos não encontrados na pasta /dados`);

        const dataLogica = await resCudc.json();
        logicaCudc = dataLogica.config_logica_cudc;

        const dataCores = await resCores.json();
        dbCores = dataCores.db_cores_acessibilidade;

        renderizarBotoes();
    } catch (e) {
        console.error("Erro no Croma:", e);
        document.getElementById('displayResultado').innerHTML = 
            `<p style="color:red"><b>Erro de Carregamento:</b> ${e.message}<br>
            Certifique-se de que os arquivos JSON na pasta /dados não possuem crases (\`\`\`) no início ou fim.</p>`;
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
    
    // Procura na lógica de secundárias ou primárias
    const pontos = logicaCudc["4_formacao_cores_secundarias"][nomeBusca] || 
                   logicaCudc["2_mapeamento_cores_primarias"][nomeBusca] || "Verificar Manual";

    let html = `<h2>${cor.nome_da_cor}</h2>`;
    html += `<p><strong>Código Braille (CUdC):</strong> ${logicaCudc["1_codigo_precedente_obrigatorio"].caractere_braille} (pontos ${logicaCudc["1_codigo_precedente_obrigatorio"].pontos}) + pontos ${pontos}</p>`;
    html += `<hr>`;

    if (contextoAtual === 'moda') {
        html += `<p><strong>Aplicação em Produtos:</strong> ${cor.dica_design_produtos_moda}</p>`;
    } else if (contextoAtual === 'decoracao') {
        html += `<p><strong>Uso em Interiores:</strong> ${cor.dica_design_interiores_decoracao}</p>`;
    } else {
        html += `<p><strong>Psicologia:</strong> ${cor.significado_psicologico_e_ideia}</p>`;
        html += `<p><strong>Referências Reais:</strong> ${cor.referencias_fisicas_mundo_real}</p>`;
        html += `<p><strong>Textura:</strong> ${cor.associacao_de_textura}</p>`;
    }

    display.innerHTML = html;
}

document.addEventListener('DOMContentLoaded', inicializar);