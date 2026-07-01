# Meu Valor - Site institucional (frontend)

Site institucional da **Meu Valor**, marca da **vml company** voltada à recuperação de
valores esquecidos na Justiça para pessoas físicas.

Este repositório contém o **frontend** (HTML, CSS e JavaScript). O backend — envio do
formulário e futura edição de conteúdo — será implementado pelo time de dados sobre
**WordPress**. Este documento descreve a arquitetura, as decisões de projeto, como manter
o código e o que permanece em aberto.

---

## 1. Visão geral e stack

- **HTML + CSS + JavaScript puro, sem etapa de build.** Não há framework nem dependências
  a instalar. O site é servido como arquivos estáticos.
- **Responsivo**, com layout de referência de **1280px** (desktop) e adaptação fluida para
  telas maiores e menores; breakpoint mobile em **768px**.
- Preparado para ser convertido em **tema WordPress**. A recomendação técnica é **tema
  clássico + ACF** (Advanced Custom Fields); ver seção 6 e o arquivo `FIELDMAP.md`.

## 2. Decisões de arquitetura (e o porquê)

**2.1. Conteúdo escrito diretamente no HTML.**
Todo o conteúdo textual e as imagens ficam no HTML de cada página. Isso garante que o
conteúdo esteja presente já na resposta do servidor, o que é essencial para **SEO** e para
a leitura por buscadores, e corresponde exatamente ao que o WordPress renderiza no servidor.
Na conversão, cada trecho de conteúdo passa a ser preenchido por um campo do CMS.

**2.2. Componentes reutilizáveis como "parciais".**
Header, footer e formulário se repetem em todas as páginas. Eles ficam em `components/`
como arquivos únicos (`header.html`, `footer.html`, `form.html`) e são injetados em cada
página por `js/include.js`. Editar o componente uma vez reflete em todo o site. No
WordPress, cada parcial corresponde a um *template-part* (`header.php`, `footer.php`, etc.).

**2.3. Design tokens centralizados.**
Cores e tipografia são definidas uma única vez em `css/style.css`, no bloco `:root`
(variáveis CSS). Qualquer alteração de cor ou fonte é feita nesse ponto e propaga para
todo o site. Ver seção 4.

**2.4. SEO como requisito de projeto.**
Cada página traz metadados, hierarquia de títulos e dados estruturados. Por estarem na
estrutura do HTML, esses elementos são preservados na migração para o WordPress. Ver seção 5.

## 3. Estrutura de arquivos

```
frontend/
  index.html            → Home
  quem-somos.html       → Quem somos
  como-funciona.html    → Como funciona
  depoimentos.html      → Depoimentos
  contato.html          → Contato (formulário + FAQ + mapa)
  obrigado.html         → Confirmação pós-envio do formulário (noindex)

  components/            → Parciais reutilizáveis (futuros template-parts)
    header.html · footer.html · form.html

  css/
    style.css            → Design tokens (:root) + todos os estilos

  js/
    include.js           → Injeta as parciais e dispara o evento "components:ready"
    nav.js               → Menu mobile + destaque do link ativo
    banner.js            → Carrossel de banners (Home)
    testimonial.js       → Carrossel de depoimentos
    faq.js               → Acordeão (sanfona) das perguntas frequentes
    form.js              → Validação e envio do formulário (endpoint a definir)

  assets/
    fonts/               → Fonte Causten (.otf)
    img/                 → Logos (SVG), banners, selos, mapa e posts

  robots.txt             → Regras para robôs de busca
  sitemap.xml            → Mapa de URLs para indexação
  FIELDMAP.md            → Contrato de campos editáveis (referência para o WordPress)
  README.md              → Este documento
```

## 4. Design tokens — cores e tipografia

Definidos em `css/style.css`, bloco `:root`:

- **Cores:** paleta oficial em variáveis `--c-*` (ex.: `--c-navy`, `--c-lime`, `--c-green`),
  referenciadas por variáveis semânticas (`--color-primary`, `--color-accent`, etc.). Para
  alterar um tom em todo o site, edita-se apenas o valor da variável.
- **Tipografia:** fonte **Causten** (carregada via `@font-face`, arquivos em `assets/fonts/`).
  A escala segue o padrão do design (tamanho / entrelinha): Hero 60/65, H1 50/54, H2 40/44,
  H3 30/38, H4 22/30, corpo 18/24 e 16/22, pequeno 14/18, overline 12/16, botão 16/20.
  Os títulos usam `clamp()` para escalar de forma fluida no mobile.

## 4.1. Proporções de imagem (padrão do site)

Todas as imagens têm proporção **travada** via CSS (`aspect-ratio` + `object-fit: cover`),
para que qualquer troca de imagem no futuro se encaixe sem quebrar o layout. Ao exportar
novas imagens, siga estas proporções:

| Onde | Proporção | Selector CSS |
|---|---|---|
| Hero, "Quem somos", mosaico de passos, mapa, página Obrigado, vídeo | **16:9** (1,78:1) | `.hero img`, `.hero-overlay img`, `.step__media img`, `.map-block img`, `.thanks-hero img`, `.video-embed` |
| Banners rotativos (Home) | **12:5 panorâmico** (2,4:1) — ex.: 1200×500 | `.banner-slide img` |
| Posts do Instagram | **3:5** (vertical) | `.instagram-post img` |
| Logos, ícones e selos | formato natural (SVG/PNG) | — |

> Como o encaixe usa `object-fit: cover`, imagens muito fora da proporção têm as bordas
> cortadas. O ideal é já exportar no formato correto: **16:9** para conteúdo, **12:5** para
> os banners e **3:5** para os posts do Instagram.

## 5. SEO

Implementado em todas as páginas indexáveis:

- `<title>`, `meta description` e `meta keywords` específicos por página, a partir do
  conteúdo de SEO fornecido.
- `link canonical` e tags **Open Graph / Twitter Card** para compartilhamento.
- **Hierarquia de títulos** semântica: um único `<h1>` por página, seguido de `<h2>`/`<h3>`.
- **Dados estruturados (JSON-LD):** `Organization` na Home e `FAQPage` no Contato (este
  último pode gerar resultados enriquecidos na busca).
- `robots.txt` e `sitemap.xml` na raiz.
- A página `obrigado.html` é marcada como `noindex`.

> **Domínio:** os endereços canônicos, Open Graph e o `sitemap.xml` usam
> `https://www.recuperameuvalor.com.br` como valor provisório. **Deve ser substituído pelo
> domínio definitivo** quando o site for hospedado.

## 6. Caminho para o WordPress

O frontend foi estruturado para conversão em **tema WordPress clássico com ACF**:

1. As parciais (`components/*.html`) tornam-se *template-parts* (`header.php`, `footer.php`,
   parcial do formulário).
2. As páginas `.html` tornam-se `front-page.php` e `page-*.php`.
3. Cada trecho de conteúdo passa a ser preenchido por um campo ACF. **O mapeamento completo
   está em `FIELDMAP.md`**, com os nomes de campo sugeridos.
4. Os metadados de SEO mapeiam para os campos do plugin de SEO (Yoast/RankMath) ou ACF.

A arquitetura também é compatível com uma abordagem *headless* (WordPress como API), caso
o time de dados prefira: neste caso o HTML/CSS serve como referência de componentes e o
conteúdo é consumido da API. A recomendação, pela simplicidade de edição e pelo SEO nativo,
é o tema clássico.

## 7. Como visualizar / hospedar

O site usa `fetch()` para montar as parciais, portanto **precisa ser servido via HTTP**
(não abre corretamente por `file://`, duplo-clique). Basta publicá-lo em qualquer
hospedagem de arquivos estáticos.

## 8. Itens em aberto

- **Formulário:** a submissão será implementada pelo **time de backend**. Atualmente,
  `js/form.js` faz validação básica e redireciona para `obrigado.html`; o endpoint
  (`FORM_ENDPOINT`) é um valor provisório.
- **Instagram:** o mosaico em `depoimentos.html` está com imagens estáticas. A integração
  com a API do Instagram deve ser feita nesse bloco.
- **Domínio:** substituir o domínio provisório (ver seção 5).
- **Revisão editorial:** o conteúdo foi aplicado a partir dos documentos de SEO; o
  posicionamento fino dos textos ainda será revisado.
- **Logo do rodapé:** foi gerada uma versão branca do logo Meu Valor (`assets/img/
  logo-meuvalor-branco.svg`) preservando o detalhe verde. Substituir caso exista um
  arquivo oficial.
