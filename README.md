# Meu Valor — Site institucional

Site institucional da **Meu Valor** (marca da vml company) para recuperação de
valores esquecidos na Justiça para pessoas físicas.

Construído como **HTML + CSS (design tokens) + Web Components em JS puro**, sem
nenhuma etapa de build. Estruturado para conversão direta em **tema WordPress + ACF**.

## Como visualizar
Abra qualquer `.html` no navegador (duplo clique). Não precisa de servidor.

## Estrutura
```
frontend/
├── index.html            → Home (com banner rotativo)
├── quem-somos.html
├── como-funciona.html
├── depoimentos.html
├── contato.html          → formulário + FAQ
├── obrigado.html         → confirmação pós-envio do formulário
└── assets/
    ├── css/
    │   ├── tokens.css     → ★ CORES e TIPOGRAFIA (única fonte de verdade)
    │   ├── base.css       → reset + fonte Causten + escala tipográfica
    │   ├── components.css → todos os componentes e seus estados
    │   └── main.css       → importa os 3 acima (único <link> nas páginas)
    ├── js/
    │   ├── components.js  → Web Components (mv-header, mv-footer, mv-lead-form, mv-security-banner)
    │   └── app.js         → banner rotativo + FAQ accordion + menu mobile
    ├── fonts/             → arquivos da fonte Causten (.woff2) — adicionar aqui
    └── img/               → imagens e ícones (hoje são marcações)
```

## Editar CORES e FONTE (num lugar só)
Tudo está em **`assets/css/tokens.css`**:
- **Cores:** mude o hex das variáveis `--c-*` (ex.: `--c-lime`, `--c-navy`). O site
  inteiro acompanha, porque os componentes usam as variáveis semânticas
  (`--color-accent`, `--color-primary`, etc.).
- **Fonte:** a família está em `--font-base`. A escala (HERO, H1…H4, corpo, botão)
  segue o padrão do Figma (size/line-height).

### Cores — pegar os hex exatos do Figma (grátis)
No Figma, clique numa camada → painel direito → clique no quadradinho da cor →
copie o **HEX**. Me passe os valores e eu troco em `tokens.css`.

### Fonte Causten
Coloque os arquivos em `assets/fonts/` com estes nomes (ver `base.css`):
`Causten-Regular.woff2`, `Causten-Medium.woff2`, `Causten-SemiBold.woff2`,
`Causten-Bold.woff2`, `Causten-ExtraBold.woff2`.
Enquanto não existirem, o site usa Poppins/sistema como aproximação.

## Componentes reutilizáveis
Definidos **uma vez** em `components.js` e usados via tag em todas as páginas:
- `<mv-header active="home">` — cabeçalho (o `active` destaca o item de menu)
- `<mv-lead-form>` — bloco do formulário (ponto de integração com o RD Station)
- `<mv-security-banner>` — faixa verde de segurança
- `<mv-footer>` — rodapé

Componentes de estilo com estados **default › hover › click** estão em
`components.css`: botões (`.btn--cta`, `.btn--navy`, `.btn--outline`, `.btn--arrow`),
cards (`.card`, `.card--active`), tags (`.tag`, `.tag--filled`), FAQ, inputs e setas.

## Integrações pendentes
- **RD Station:** o `<form>` em `mv-lead-form` está marcado com `data-rd-form` e hoje
  aponta para `obrigado.html`. Será substituído pelo embed/integração do RD Station.
- **Imagens/ícones:** hoje são marcações (`.img-placeholder`, `.card__icon`).

## Conversão para WordPress (próxima fase)
Mapa direto:
- `tokens.css` → variáveis do tema (e/ou opções no Customizer/ACF).
- Web Components → `template-parts` (`header.php`, `footer.php`, `lead-form.php`…).
- Textos/imagens → campos **ACF** editáveis no painel.
- Banner rotativo → slides editáveis (ACF repeater) + mesmo JS ou Swiper.
- Páginas `.html` → `front-page.php` e `page-*.php`.
