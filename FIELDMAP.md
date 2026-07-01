# FIELDMAP — Contrato de campos editáveis (para o time de dados / WordPress)

Este documento lista **o que deve ser editável no WordPress** em cada página, com um
**nome de campo sugerido** (padrão ACF). O conteúdo hoje está **inline no HTML** — o time
de dados só precisa "embrulhar" cada trecho com o campo correspondente (`the_field()` no
tema clássico, ou expor na API se optarem por headless).

> Convenção dos nomes: `pagina_secao_elemento`. Ajustem livremente ao schema de vocês.

---

## Componentes globais (parciais → template-parts)

Arquivos: `components/header.html`, `components/footer.html`, `components/form.html`.
São iguais em todas as páginas — no WordPress viram `header.php`, `footer.php` e um
`template-part` do formulário.

| Campo | Tipo | Onde |
|---|---|---|
| `global_logo` | imagem (SVG) | header + footer (`assets/img/logo-meuvalor*.svg`) |
| `global_menu` | lista de links | header + footer |
| `global_telefone` | texto | footer |
| `global_email` | texto | footer |
| `global_abrangencia` | texto | footer ("RS, SP e DF") |
| `global_endereco` | texto | footer |
| `global_redes_sociais` | lista (ícone + link) | footer |
| `global_selos` | galeria (4 imagens) | footer (`assets/img/badge-*.jpg`) |
| `global_alerta_seguranca` | texto | faixa verde (todas as páginas) |
| `form_titulo` / `form_texto` / `form_aviso` | texto | parcial do formulário |
| `form_campos` | (nome, whatsapp, e-mail) | **integração/envio: time de backend** |

## SEO (por página — no `<head>`)
Cada página tem: `meta_title`, `meta_description`, `meta_keywords`, `canonical`,
Open Graph (`og:title`, `og:description`, `og:image`, `og:url`) e dados estruturados
JSON-LD. No WordPress, mapear para os campos do Yoast/RankMath (ou ACF).

⚠️ **Domínio:** os links canônicos/OG usam `https://www.recuperameuvalor.com.br` como
placeholder. **Trocar pelo domínio final** ao subir na hospedagem da vml.

---

## Home (`index.html`)
| Campo | Tipo |
|---|---|
| `home_banners` | **lista** (imagem + alt) — banner rotativo |
| `home_hero_titulo` / `home_hero_texto` | texto |
| `home_faz_titulo` / `home_faz_texto` | texto (O QUE FAZEMOS) |
| `home_perfis` | **lista** de 4 cards (título + texto) |
| `home_perfis_cta` | link ("Tenho dúvidas, me ajuda?") |
| `home_vml_titulo` / `home_vml_texto` / `home_vml_cta` | texto + link (vml company) |
| `home_seguranca_titulo` / `home_seguranca_texto` | texto |

## Quem somos (`quem-somos.html`)
| Campo | Tipo |
|---|---|
| `quemsomos_hero_titulo` / `quemsomos_hero_texto` | texto + imagem |
| `quemsomos_visao_titulo` / `quemsomos_visao_texto` | texto |
| `quemsomos_stats` | **lista** de 4 (número + label) |
| `quemsomos_dna_titulo` / `quemsomos_dna_texto` | texto |
| `quemsomos_video` | vídeo/embed (thumb `video-thumb-fundador.jpg`) |
| `quemsomos_move_titulo` / `quemsomos_move_texto` | texto |
| `quemsomos_depoimento` | texto (banner de fechamento) |

## Como funciona (`como-funciona.html`)
| Campo | Tipo |
|---|---|
| `comofunciona_hero_titulo` / `comofunciona_hero_texto` | texto + imagem |
| `comofunciona_diferenciais` | **lista** de 3 cards |
| `comofunciona_conduz_titulo` / `comofunciona_conduz_texto` | texto |
| `comofunciona_passos` | **lista** de 3 (Varredura / Análise / Liberação) |

## Depoimentos (`depoimentos.html`)
| Campo | Tipo |
|---|---|
| `depoimentos_hero_titulo` / `depoimentos_hero_texto` | texto |
| `depoimentos_lista` | **lista** (texto + autor + contexto) — carrossel |
| `depoimentos_redes_titulo` / `depoimentos_redes_texto` | texto |
| `instagram_posts` | **lista** (imagem + legenda + link) — **hoje estático; integração via API do Instagram entra aqui** |

## Contato (`contato.html`)
| Campo | Tipo |
|---|---|
| `contato_hero_titulo` / `contato_hero_texto` | texto |
| `faq_lista` | **lista** (pergunta + resposta) — alimenta também o JSON-LD FAQPage |
| `contato_mapa` | imagem/embed do mapa |

## Obrigado (`obrigado.html`)
Página de confirmação (noindex). Campos: `obrigado_titulo`, `obrigado_texto`.
