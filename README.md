# Croma — Chromatic Accessibility Engineering

[Leia em Português](#português) | [Read in English](#english)

---

<a name="english"></a>
## English

The **Croma** is a logic engine and reference library for translating chromatic attributes into technical tactile and conceptual specifications. Based on Vygotsky's Socio-historical Theory and the **Universal Color Code (CUdC)**, the project promotes equity in color perception for blind or low-vision individuals.

### 🧠 The Philosophy
Unlike tools that merely name colors, Croma focuses on **immutable aspects**:
1. **Technical Logic:** Systematic representation in the Braille cell (CUdC).
2. **Sensory Physics:** Thermal and kinesthetic properties (heat, weight, texture).
3. **Evolutionary Psychology:** Biological and emotional impact (alertness, calm, energy).

### 🚀 How the Library Works (CromaCore)
The `CromaCore.js` library works as a "color calculator". It processes inputs (primaries and intensities) and returns a complete multisensory technical sheet.

#### Usage Example (JS):
```javascript
import { CromaCore } from './CromaCore.js';

const engine = new CromaCore('en'); // Set language to English
const sheet = engine.gerarFicha('red', 'yellow', 'bold'); // Generates Bold Orange

console.log(sheet.tecnico.codigo_string); // "ç + 1425"
console.log(sheet.percepcao.temperatura); // "warm"
```

---

<a name="português"></a>
## Português

O **Croma** é um motor lógico (Engine) e biblioteca de referência para a tradução de atributos cromáticos em especificações técnicas táteis e conceituais. Fundamentado na Teoria Histórico-Cultural de Vigotski e no **Código Universal de Cores (CUdC)**, o projeto promove a equidade na percepção das cores por pessoas cegas ou com baixa visão.

### 🧠 A Filosofia
Diferente de ferramentas que apenas nomeiam cores, o Croma foca nos **aspectos imutáveis** da cor:
1. **Lógica Técnica:** Representação sistemática na cela Braille (CUdC).
2. **Física Sensorial:** Propriedades térmicas e cinestésicas (calor, peso, textura).
3. **Psicologia Evolutiva:** Impacto biológico e emocional (alerta, calma, energia).

### 🚀 Como Funciona a Biblioteca (CromaCore)
A biblioteca `CromaCore.js` funciona como uma "calculadora de cores". Ela processa entradas (primárias e intensidades) e devolve uma ficha técnica multissensorial completa.

#### Exemplo de Uso (JS):
```javascript
import { CromaCore } from './CromaCore.js';

const engine = new CromaCore('pt');
const ficha = engine.gerarFicha('vermelho', 'amarelo', 'forte'); // Gera Laranja Forte

console.log(ficha.tecnico.codigo_string); // "ç + 1425"
console.log(ficha.percepcao.temperatura); // "quente"
```

---

### ☕ Contribua com a Pesquisa / Support the Research
O Croma é um projeto de código aberto e pesquisa independente. / Croma is an open-source project and independent research.

- **Pix:** `euconcego@gmail.com`
- **PayPal:** `aanderson.carvalho@hotmail.com`

### [GitHub Pages Documentation](https://concego.github.io/croma/) | [Download Repository](https://github.com/concego/croma)

*Developed by **Anderson Carvalho (Eu Concego Jogar)** — Promoting digital inclusion through engineering and culture.*
