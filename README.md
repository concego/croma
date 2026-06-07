# Croma — Engenharia de Acessibilidade Cromática

O **Croma** é um motor lógico (Engine) e biblioteca de referência para a tradução de atributos cromáticos em especificações técnicas táteis e conceituais. Fundamentado na Teoria Histórico-Cultural de Vigotski e no **Código Universal de Cores (CUdC)**, o projeto promove a equidade na percepção das cores por pessoas cegas ou com baixa visão.

## 🧠 A Filosofia
Diferente de ferramentas que apenas nomeiam cores, o Croma foca nos **aspectos imutáveis** da cor:
1. **Lógica Técnica:** Representação sistemática na cela Braille (CUdC).
2. **Física Sensorial:** Propriedades térmicas e cinestésicas (calor, peso, textura).
3. **Psicologia Evolutiva:** Impacto biológico e emocional (alerta, calma, energia).

## 🚀 Como Funciona a Biblioteca (CromaCore)
A biblioteca `CromaCore.js` funciona como uma "calculadora de cores". Ela processa entradas (primárias e intensidades) e devolve uma ficha técnica multissensorial completa.

### Exemplo de Uso (JS):
```javascript
import { CromaCore } from './CromaCore.js';

const engine = new CromaCore();
const ficha = engine.gerarFicha('vermelho', 'amarelo', 'forte'); // Gera Laranja Forte

console.log(ficha.tecnico.codigo_string); // "ç + 1425"
console.log(ficha.percepcao.temperatura); // "quente"
console.log(ficha.percepcao.estimulo);    // "alerta/urgência e alegria/otimismo"
```

## 📚 Base de Pesquisa
Este motor é alimentado por uma curadoria científica que inclui:
- **CUdC:** Sistema de Pereira e Ferronato (2019).
- **See Color:** Linguagens táteis para deficiência visual.
- **Psicologia das Cores:** Significados universais e biológicos.
- **Termodinâmica:** Relação entre cor e absorção de calor.

## 🛠️ Aplicações Possíveis
O Croma foi desenhado para ser o "miolo" de diversas soluções:
- **Design de Produtos:** Criação de etiquetas táteis padronizadas.
- **Educação Inclusiva:** Ferramentas pedagógicas para ensino de artes e física.
- **Arquitetura/Moda:** Validadores de intenção sensorial para projetos acessíveis.
- **Dispositivos IoT:** Sensores que traduzem cor para feedback háptico ou sonoro.

---

### ☕ Contribua com a Pesquisa
O **Croma** é um projeto de código aberto e pesquisa independente. Se esta biblioteca é útil para você ou sua empresa, considere apoiar a continuidade deste trabalho de engenharia de acessibilidade:

- **Pix / PayPal:** `aanderson.carvalho@hotmail.com`

---

### [Explorar Documentação de Usabilidade (GitHub Pages)](https://concego.github.io/croma/)
### [Baixar / Clonar o Repositório](https://github.com/concego/croma)

*Desenvolvido por **Anderson Carvalho (Eu Concego Jogar)** — Promovendo inclusão digital através da engenharia e da cultura.*
