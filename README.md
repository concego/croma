---



\# Croma - Engenharia de Acessibilidade Cromática



O \*\*Croma\*\* é um instrumento cultural especial desenvolvido para promover a equidade na percepção e uso das cores por pessoas cegas ou com baixa visão. O projeto converte atributos cromáticos em especificações técnicas táteis e conceituais, fundamentado em pesquisas de acessibilidade e no \*\*Código Universal de Cores (CUdC)\*\*.



\## 🛠️ Funcionalidades Técnicas



\* \*\*Implementação do CUdC:\*\* Tradução sistemática de cores para a cela Braille, utilizando o código precedente obrigatório `ç` (pontos 12346).

\* \*\*Mapeamento Multissensorial:\*\* Fornece âncoras mentais concretas para cada cor (ex: \*\*Vermelho\*\* associado ao calor/tomate; \*\*Azul\*\* ao frescor/água).

\* \*\*Consultoria de Contexto:\*\* Filtros específicos para aplicação de cores em \*\*Moda/Produtos\*\* e \*\*Arquitetura/Interiores\*\*, auxiliando designers na criação de projetos inclusivos.

\* \*\*Interface Acessível:\*\* Desenvolvido com foco total em leitores de tela (NVDA e TalkBack), utilizando atributos \*\*WAI-ARIA\*\* e regiões de atualização dinâmica (`aria-live`).



\## 📚 Fundamentação Teórica



O projeto aplica conceitos discutidos em instituições de referência como o \*\*Instituto Benjamin Constant\*\* e a \*\*UFRGS\*\*, unindo a teoria histórico-cultural de Vigotski com a praticidade do desenvolvimento de software. A ferramenta foca na autonomia do usuário para identificar, combinar e rotular objetos (como através de etiquetas Braille em produtos artesanais).



\## 💻 Estrutura de Diretórios



\* `/dados`: Contém as bases de dados em JSON com a lógica do CUdC e os significados das cores.

\* `/js`: Motores de processamento e manipulação de dados.

\* `index.html`: Interface principal otimizada para acessibilidade.



---



