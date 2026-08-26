# Plano de Refatoração do Cubo Hero

## Objetivo
Reproduzir o elemento visual do hero usando HTML5 Canvas/WebGL, mantendo o conceito da referência:
- Cubo 3D central feito de material vermelho/rubi, translúcido e brilhante
- Anel/ribbon de níquel líquido orbitando ao redor do cubo
- Interação suave com mouse
- Efeitos de iluminação e glow premium

## Estado Atual
- Projeto usa React Three Fiber + Three.js
- Cubo com 2 camadas (núcleo interno + casca externa)
- Sistema de interação com mouse já implementado com lerp
- Iluminação com pointLights e directionalLights
- Grid no chão (sem glow)

## Plano de Implementação

### 1. Cubo Rubi Translúcido
- Refinar os materiais existentes para parecer cristal/rubi:
  - Usar `transmission` para efeito de vidro/cristal
  - Ajustar `metalness` (0.2-0.4) e `roughness` (0.1-0.2)
  - Melhorar `emissive` para glow interno vermelho
  - Aumentar transparência com `opacity` e `transparent`
  - Manter `clearcoat` para reflexos de alta qualidade

### 2. Anel de Níquel Líquido
- Criar `TorusGeometry` para o anel base
- Material metálico: `metalness: 0.95`, `roughness: 0.05`
- Cor: cinza/prata metálica (#C0C0C0 ou similar)
- **Ondulações/irregularidades:**
  - Usar vertex shader para deformar a geometria
  - Ou modificar vértices do torus com ondas senoidais
  - Animação sutil das ondulações para parecer líquido

### 3. Órbita Contínua do Anel
- Inclinar o anel (rotação X/Z) para criar órbita elíptica visual
- Animar rotação Y contínua em `useFrame`
- Profundidade 3D natural (Three.js já resolve isso)
- Velocidade lenta e constante

### 4. Gotas/Partículas de Níquel
- Criar 5-10 pequenas esferas (`SphereGeometry`)
- Material idêntico ao anel (metálico)
- Posicioná-las próximas ao anel
- Animação:
  - Algumas acompanham a órbita
  - Outras se desprendem lentamente
  - Pequena variação de posição para parecer orgânico

### 5. Interação do Mouse
- **Manter** o sistema de lerp já existente (está bom!)
- Ajustar sensibilidade se necessário
- Garantir que o cubo retorne à posição original quando mouse para
- **Importante:** Isolar rotação do cubo da órbita do anel (anéis em grupo separado)

### 6. Bloom/Glow
- Adicionar `EffectComposer` com `UnrealBloomPass`
- Configurar:
  - `threshold: 0`
  - `strength: 1.2-1.5`
  - `radius: 0.5-0.8`
- Aplicar apenas nas bordas emissivas do cubo

### 7. Iluminação
- Manter luz vermelha emitida pelo cubo (pointLights)
- Ajustar intensidade para melhor realismo
- Garantir que o níquel reflita essa luz vermelha
- Adicionar highlights especulares fortes no metal líquido

### 8. Performance e Responsividade
- Manter estrutura de componentes isolados
- Garantir cleanup correto no `useEffect`
- Usar `useMemo` para texturas/geometrias estáticas
- Testar em diferentes tamanhos de tela

## Estrutura de Componentes Proposta
```
HeroCube.tsx (principal)
├── RubyCube (cubos rubi translúcidos)
├── NickelRing (anel com ondulações)
├── NickelDrops (gotas de metal)
└── SceneSetup (iluminação, bloom, câmera)
```

## Ordem de Implementação
1. [ ] Refatorar cubo para material rubi
2. [ ] Criar anel de níquel básico
3. [ ] Adicionar ondulações no anel
4. [ ] Implementar órbita do anel
5. [ ] Adicionar gotas de níquel
6. [ ] Ajustar interação do mouse
7. [ ] Adicionar bloom/glow
8. [ ] Refinar iluminação
9. [ ] Testar performance

## Requisitos Técnicos
- Manter React para estrutura do componente
- Usar Three.js / React Three Fiber para 3D
- Não usar imagens/GIF para animação
- Canvas isolado como componente
- Animação e interação separadas da UI
- Resize responsivo
- Sem vazamento de memória ao desmontar
- Funcionar bem em desktop e touch
