/**
 * CromaCore.js
 * Engine for Chromatic Accessibility Engineering based on CUdC.
 * Focused on immutable elements: Braille Logic and Fundamental Psychology.
 */

export class CromaCore {
    constructor(lang = 'pt') {
        this.lang = lang.toLowerCase();
        this.precedente = { caractere: 'ç', pontos: '12346' };
        
        this.traducoes = {
            'pt': {
                quente: 'quente', frio: 'frio', equilibrada: 'equilibrada',
                e: ' e ', claro: 'claro', medio: 'medio', forte: 'forte'
            },
            'en': {
                quente: 'warm', frio: 'cold', equilibrada: 'balanced',
                e: ' and ', claro: 'light', medio: 'medium', forte: 'bold'
            }
        };

        this.primarias = {
            'amarelo': { 
                id: 'yellow',
                linha: [1, 4], 
                pt: { temp: 'quente', peso: 'leve', est: 'alegria/otimismo', tac: 'sol/frutas cítricas', sab: 'azedo (limão)/doce (banana)', bio: 'estímulo cognitivo alto' },
                en: { temp: 'warm', peso: 'light', est: 'joy/optimism', tac: 'sun/citrus fruits', sab: 'sour (lemon)/sweet (banana)', bio: 'high cognitive stimulus' }
            },
            'vermelho': { 
                id: 'red',
                linha: [2, 5], 
                pt: { temp: 'quente', peso: 'pesado', est: 'alerta/urgência/paixão', tac: 'calor intenso/fogo/vibração da pele', sab: 'picante (pimenta)/doce intenso (morango)', bio: 'aumento do metabolismo/pressão arterial' },
                en: { temp: 'warm', peso: 'heavy', est: 'alert/urgency/passion', tac: 'intense heat/fire/skin vibration', sab: 'spicy (pepper)/intense sweet (strawberry)', bio: 'increased metabolism/blood pressure' }
            },
            'azul': { 
                id: 'azul',
                linha: [3, 6], 
                pt: { temp: 'frio', peso: 'medio', est: 'calma/confiança/serenidade', tac: 'umidade/água/frescor', sab: 'fresco/suave', bio: 'inibe melatonina/aumenta alerta consciente' },
                en: { temp: 'cold', peso: 'medium', est: 'calm/confidence/serenity', tac: 'humidity/water/freshness', sab: 'fresh/smooth', bio: 'inhibits melatonin/increases conscious alertness' }
            }
        };

        // Aliases para entrada bilíngue
        this.alias = {
            'yellow': 'amarelo', 'red': 'vermelho', 'blue': 'azul',
            'light': 'claro', 'medium': 'medio', 'bold': 'forte'
        };

        this.intensidades = {
            'claro': { colunas: [1], valor: '33.3%' },
            'medio': { colunas: [2], valor: '66.6%' },
            'forte': { colunas: [1, 2], valor: '100%' }
        };
    }

    setLang(l) { this.lang = l.toLowerCase(); }

    gerarFicha(cor1, cor2 = null, nivel = 'forte') {
        const c1 = this.alias[cor1.toLowerCase()] || cor1.toLowerCase();
        const c2 = cor2 ? (this.alias[cor2.toLowerCase()] || cor2.toLowerCase()) : null;
        const n = this.alias[nivel.toLowerCase()] || nivel.toLowerCase();

        const coresInput = [c1];
        if (c2) coresInput.push(c2);

        const pontos = new Set();
        const atributos = { temp: [], est: [], tátil: [], bio: [], sabor: [] };
        const t = this.traducoes[this.lang] || this.traducoes['pt'];

        coresInput.forEach(c => {
            const d = this.primarias[c];
            if (d) {
                const cols = this.intensidades[n].colunas;
                cols.forEach(col => {
                    if (col === 1) pontos.add(d.linha[0]);
                    if (col === 2) pontos.add(d.linha[1]);
                });
                const loc = d[this.lang] || d['pt'];
                atributos.temp.push(loc.temp);
                atributos.est.push(loc.est);
                atributos.tátil.push(loc.tac);
                atributos.bio.push(loc.bio);
                atributos.sabor.push(loc.sab);
            }
        });

        return {
            tecnico: {
                precedente: this.precedente,
                pontos_braille: Array.from(pontos).sort(),
                codigo_string: `${this.precedente.caractere} + ${Array.from(pontos).sort().join('')}`
            },
            percepcao: {
                temperatura: this._processarTemp(atributos.temp),
                estimulo: atributos.est.join(t.e),
                referencia_fisica: atributos.tátil.join(' + '),
                impacto_biologico: atributos.bio.join(' | '),
                paladar_olfato: atributos.sabor.join(t.e)
            }
        };
    }

    _processarTemp(ts) {
        const t = this.traducoes[this.lang] || this.traducoes['pt'];
        if (ts.every(x => x === t.quente)) return t.quente;
        if (ts.every(x => x === t.frio)) return t.frio;
        return t.equilibrada;
    }
}
