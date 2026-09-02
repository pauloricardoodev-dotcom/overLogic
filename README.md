# overLogic Hero - React Project

Projeto React convertido do arquivo HTML original da overLogic Hero Section.

## Tecnologias

- **React 18** - Biblioteca JavaScript para construção de interfaces
- **Vite** - Build tool e dev server rápido
- **Tailwind CSS** - Framework CSS para estilização
- **PostCSS + Autoprefixer** - Processamento de CSS

## Estrutura do Projeto

```
overLogic/
├── src/
│   ├── components/
│   │   ├── Hero.jsx          # Componente principal Hero
│   │   ├── Hero.css          # Estilos do Hero
│   │   └── Cube.jsx          # Componente do cubo 3D interativo
│   ├── App.jsx               # Componente raiz
│   ├── main.jsx              # Entry point
│   └── index.css             # Estilos globais
├── public/                   # Arquivos estáticos
├── prototype/                # Arquivo HTML original
│   └── hero.html             # Arquivo HTML original
├── index.html                # Template HTML
├── tailwind.config.js        # Configuração do Tailwind
├── postcss.config.js         # Configuração do PostCSS
└── package.json              # Dependências
```

## Como Executar

### Instalar dependências
```bash
npm install
```

### Iniciar servidor de desenvolvimento
```bash
npm run dev
```

O projeto estará disponível em `http://localhost:5173`

### Build para produção
```bash
npm run build
```

### Preview do build de produção
```bash
npm run preview
```

## Funcionalidades

- **Cubo 3D Interativo**: Cubo com animação de flutuação e resposta ao movimento do mouse
- **Navegação Responsiva**: Menu de navegação com suporte a mobile
- **Design Responsivo**: Layout adaptável para diferentes tamanhos de tela
- **Animações CSS**: Animações suaves e transições
- **SVG Background**: Linhas de circuito decorativas no fundo

## Componentes

### Hero.jsx
Componente principal que contém toda a estrutura da hero section, incluindo:
- Navegação
- Conteúdo de texto
- Cubo 3D
- Linhas de fundo (SVG)

### Cube.jsx
Componente do cubo 3D com:
- Animação de flutuação automática
- Interação com mouse (rotação)
- Efeitos de perspectiva 3D
- Gradientes e sombras

## Personalização

### Cores
As cores principais estão definidas no `tailwind.config.js`:
- `bg`: #0a0808 (fundo principal)
- `red`: #e6172c (cor de destaque)
- `white`: #f5f3f2 (texto principal)
- `grey`: #9c9694 (texto secundário)

### Estilos
Estilos adicionais estão em:
- `src/index.css` - Estilos globais e animações
- `src/components/Hero.css` - Estilos específicos do Hero

## Conversão do HTML Original

O projeto foi convertido do arquivo HTML original (`prototype/hero.html`) mantendo:
- ✅ Design visual idêntico
- ✅ Funcionalidades interativas
- ✅ Responsividade
- ✅ Animações CSS
- ✅ Gradientes e efeitos

As principais mudanças:
- HTML → JSX (React components)
- CSS inline → CSS modules
- JavaScript vanilla → React hooks (useState, useRef)
- Estrutura monolítica → Componentes modulares
