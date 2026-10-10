# Refatoração do cubo 3D holográfico — Overlogic

Quero refatorar o cubo 3D holográfico existente no Hero da Overlogic, utilizando a imagem de referência disponibilizada no projeto como guia visual.

**IMPORTANTE:** antes de modificar qualquer coisa, analise o componente `Cube` e o arquivo `Hero.css`. O cubo atual é implementado com CSS 3D e React. Preserve essa abordagem se ela for suficiente para alcançar o resultado desejado.

## 1. Objetivo visual

Transformar o cubo atual, que apresenta uma aparência predominantemente vermelha, em um cubo 3D inspirado fielmente no cubo mágico da imagem de referência.

O objeto deve possuir uma estrutura visual 3×3 em cada face visível, com nove peças por face, respeitando a perspectiva tridimensional.

### Distribuição das cores

- **Face superior:** nove peças com contornos brancos.
- **Face frontal/esquerda da perspectiva:** nove peças com contornos vermelhos.
- **Face lateral direita da perspectiva:** nove peças com contornos azul-ciano.

O posicionamento das cores deve corresponder à perspectiva da imagem de referência, e não apenas à nomenclatura das classes CSS.

### Aparência das peças

- Corpo predominantemente preto, com acabamento escuro e ligeiramente brilhante.
- Separações pretas nítidas entre as nove peças de cada face.
- Contornos coloridos individuais, com cantos arredondados.
- Centros das peças escuros, criando contraste com os contornos.
- Pequenos reflexos e variações de iluminação para dar profundidade.
- Geometria consistente, sem sobreposição indevida das faces ou aparência de um cubo plano.

Não quero apenas pintar cada face inteira de uma cor. A característica principal da referência é a grade 3×3, com contornos individuais em cada peça.

## 2. Preservar a identidade holográfica

A referência define a geometria e a distribuição das cores, mas o resultado precisa continuar integrado à estética tecnológica da Overlogic.

Mantenha o efeito holográfico existente, adaptando-o para trabalhar com as três cores:

- Branco na face superior.
- Vermelho na face frontal.
- Azul-ciano na face lateral direita.

Use brilho emissivo, sombras, reflexos e efeitos de iluminação com moderação. Evite aplicar um filtro vermelho global que faça todas as faces parecerem da mesma cor.

O cubo deve parecer um objeto 3D tecnológico, com profundidade e luminosidade, e não uma imagem 2D com bordas coloridas.

## 3. Preservar as funcionalidades existentes

Não remova nem prejudique:

- A rotação automática do cubo.
- A interação com o mouse.
- A inclinação do objeto conforme a posição do cursor.
- A continuidade da rotação após o mouse sair do objeto.
- O posicionamento do cubo dentro do Hero.
- O efeito de iluminação no chão, representado por `.glow-floor`.
- A responsividade e a integração visual com o restante da página.

Não altere outras seções do site.

## 4. Implementação técnica

Analise a implementação atual antes de escolher a estratégia.

Você pode adaptar o HTML/JSX e o CSS para criar as nove peças individuais em cada face. Se necessário, utilize componentes ou elementos gerados dinamicamente, evitando duplicação desnecessária de código.

Garanta que:

- A estrutura CSS 3D permaneça consistente.
- As faces tenham posicionamento e profundidade corretos.
- As peças mantenham espaçamento uniforme.
- A perspectiva corresponda à imagem de referência.
- As cores permaneçam distintas durante a rotação.
- Os efeitos holográficos não prejudiquem a legibilidade da geometria.

Se a implementação atual não permitir uma reprodução satisfatória, explique a limitação antes de propor uma mudança maior de arquitetura.

## 5. Arquivos e validação

Primeiro, inspecione o componente `Cube` e o arquivo `Hero.css`, identificando como as faces, as cores, a iluminação e os efeitos são construídos.

Depois, implemente as alterações necessárias nos arquivos existentes.

Ao finalizar:

1. Verifique se o cubo apresenta uma grade 3×3 em cada face.
2. Confirme a distribuição branca, vermelha e azul-ciano.
3. Confira a rotação automática e a interação com o mouse.
4. Verifique se o cubo continua adequado ao layout responsivo.
5. Informe quais arquivos foram alterados e quais decisões técnicas foram tomadas.

Priorize a fidelidade à imagem de referência, sem sacrificar as funcionalidades nem a identidade visual da Overlogic.