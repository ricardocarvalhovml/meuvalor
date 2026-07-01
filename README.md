# Meu Valor — Site institucional (frontend)

Site institucional da **Meu Valor** (marca da **vml company**) para recuperação de valores
esquecidos na Justiça para pessoas físicas.

**Stack:** HTML + CSS + JavaScript puro, **sem build**. Estruturado para o time de dados
plugar o **WordPress** depois (clássico + ACF é o caminho recomendado; ver `FIELDMAP.md`).

## Princípios da entrega
- **Conteúdo inline no HTML** (nada de JSON que não seria usado) → bom para SEO e fácil de
  "embrulhar" com os campos do WordPress.
- **Componentes reutilizáveis (parciais):** `header`, `footer` e `form` ficam em
  `components/`, montados **uma vez** e injetados em todas as páginas (`include.js`).
- **Design tokens únicos:** cores e tipografia (Causten) ficam só em `css/style.css` (`:root`).
  Mudou um tom de azul ali? Muda no site inteiro.
- **SEO em todas as páginas:** `<title>`, meta description/keywords, canonical, Open Graph,
  hierarquia de títulos (um `<h1>` por página) e dados estruturados JSON-LD
  (Organization na Home; FAQPage no Contato). Mais `robots.txt` e `sitemap.xml`.

## Estrutura
```
frontend/
  index.html · quem-somos.html · como-funciona.html
  depoimentos.html · contato.html · obrigado.html
  components/         → header.html · footer.html · form.html   (parciais)
  css/style.css       → tokens (cores + Causten) + todos os estilos
  js/
    include.js         → injeta as parciais e dispara "components:ready"
    nav.js · banner.js · faq.js · testimonial.js · form.js
  assets/
    fonts/             → Causten (.otf)
    img/               → logos (SVG), banners, selos, mapa, posts
  robots.txt · sitemap.xml
  FIELDMAP.md          → contrato de campos editáveis (para o time de dados)
```

## Como visualizar
Publique no **Vercel** (ou qualquer host estático) e acesse pela URL. O site usa `fetch()`
para montar as parciais, então **precisa de HTTP** — não abre por duplo-clique (`file://`).

## Editar cores e tipografia (num lugar só)
Em `css/style.css`, bloco `:root`:
```css
--c-navy: #20498A;   /* tom de azul principal — muda no site todo */
--font-heading: "Causten", ...;
```

## Pendências (dependem de terceiros)
- **Formulário:** integração/envio será feita pelo **time de backend** (o `form.js` hoje só
  valida e redireciona para `obrigado.html`).
- **Instagram:** o mosaico em `depoimentos.html` é estático; a integração com a API entra ali.
- **Domínio:** canônicos/OG/sitemap usam `www.recuperameuvalor.com.br` como placeholder —
  trocar pelo domínio final na hospedagem da vml.
- **Revisão de textos:** conteúdo veio dos documentos de SEO; revisar posicionamento fino.
