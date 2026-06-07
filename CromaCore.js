/**
 * CromaCore.js
 * Motor lógico para Engenharia de Acessibilidade Cromática baseada no CUdC.
 * Focado em elementos imutáveis: Lógica Braille e Psicologia Fundamental.
 */

export class CromaCore {
    constructor() {
        this.precedente = { caractere: 'ç', pontos: '12346' };
        
        this.primarias = {
            'amarelo': { 
                linha: [1, 4], 
                temperatura: 'quente', 
                peso: 'leve', 
                estimulo: 'alegria/otimismo', 
                ancora_tátil: 'sol/frutas cítricas',
                paladar_olfato: 'azedo (limão)/doce (banana)',
                biologia: 'estímulo cognitivo alto'
            },
            'vermelho': { 
                linha: [2, 5], 
                temperatura: 'quente', 
                peso: 'pesado', 
                estimulo: 'alerta/urgência/paixão', 
                ancora_tátil: 'calor intenso/fogo/vibração da pele',
                paladar_olfato: 'picante (pimenta)/doce intenso (morango)',
                biologia: 'aumento do metabolismo/pressão arterial'
            },
            'azul': { 
                linha: [3, 6], 
                temperatura: 'frio', 
                peso: 'medio', 
                estimulo: 'calma/confiança/serenidade', 
                ancora_tátil: 'umidade/água/frescor',
                paladar_olfato: 'fresco/suave',
                biologia: 'inibe melatonina/aumenta alerta consciente'
            }
        };

        this.neutras = {
            'branco': { pontos: [], significado: 'pureza/clareza', sensorial: 'vazio/luz' },
            'preto': { pontos: [1, 2, 3, 4, 5, 6], significado: 'sofisticação/opressão', sensorial: 'densidade/peso' },
            'cinza': { pontos: [2, 5], significado: 'rigidez/neutralidade', sensorial: 'metal/concreto/trovão' }
        };

        this.intensidades = {
            'claro': { colunas: [1], valor: '33.3%' },
            'medio': { colunas: [2], valor: '66.6%' },
            'forte': { colunas: [1, 2], valor: '100%' }
        };
    }

    /**
     * Gera a Ficha Técnica completa baseada no CUdC e na pesquisa multissensorial.
     */
    gerarFicha(cor1, cor2 = null, nivel = 'forte') {
        const coresInput = [cor1.toLowerCase()];
        if (cor2) coresInput.push(cor2.toLowerCase());

        const pontos = new Set();
        const atributos = { temp: [], est: [], tátil: [], bio: [], sabor: [] };

        coresInput.forEach(c => {
            const d = this.primarias[c];
            if (d) {
                const cols = this.intensidades[nivel].colunas;
                cols.forEach(col => {
                    if (col === 1) pontos.add(d.linha[0]);
                    if (col === 2) pontos.add(d.linha[1]);
                });
                atributos.temp.push(d.temperatura);
                atributos.est.push(d.estimulo);
                atributos.tátil.push(d.ancora_tátil);
                atributos.bio.push(d.biologia);
                atributos.sabor.push(d.paladar_olfato);
            }
        });

        return {
            tecnico: {
                precedente: this.precedente,
                pontos_braille: Array.from(pontos).sort(),
                codigo_string: `ç + ${Array.from(pontos).sort().join('')}`
            },
            percepcao: {
                temperatura: this._processarTemp(atributos.temp),
                estimulo: atributos.est.join(' e '),
                referencia_fisica: atributos.tátil.join(' + '),
                impacto_biologico: atributos.bio.join(' | '),
                paladar_olfato: atributos.sabor.join(' e ')
            }
        };
    }

    _processarTemp(ts) {
        if (ts.every(t => t === 'quente')) return 'quente';
        if (ts.every(t => t === 'frio')) return 'frio';
        return 'equilibrada';
    }
}
