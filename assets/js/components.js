/* =============================================================
   MEU VALOR — COMPONENTES REUTILIZÁVEIS (Web Components)
   -------------------------------------------------------------
   Definidos UMA vez, usados nas 6 páginas via tags próprias:
     <mv-header active="home"></mv-header>
     <mv-lead-form></mv-lead-form>
     <mv-security-banner></mv-security-banner>
     <mv-footer></mv-footer>

   Usam light DOM (sem Shadow DOM) para herdar o CSS global —
   assim o HTML interno transfere 1:1 para os template-parts do
   tema WordPress (header.php, footer.php, etc.) na conversão.
   ============================================================= */

(function () {
  'use strict';

  /* ---- Marca/logo reaproveitada ---- */
  function logo(light) {
    return '<a href="index.html" class="logo' + (light ? ' logo--light' : '') + '" aria-label="Meu Valor — início">' +
             '<span class="logo__text">Meu<strong>Val<span class="logo__dot">o</span>r</strong></span>' +
           '</a>';
  }

  var NAV = [
    { href: 'index.html',          key: 'home',          label: 'Home',          inHeader: false },
    { href: 'quem-somos.html',     key: 'quem-somos',    label: 'Quem somos',    inHeader: true  },
    { href: 'como-funciona.html',  key: 'como-funciona', label: 'Como funciona', inHeader: true  },
    { href: 'depoimentos.html',    key: 'depoimentos',   label: 'Depoimentos',   inHeader: true  },
    { href: 'contato.html',        key: 'contato',       label: 'Contato',       inHeader: true  }
  ];

  /* ============================ HEADER ============================ */
  class MvHeader extends HTMLElement {
    connectedCallback() {
      var active = this.getAttribute('active') || '';
      var links = NAV.filter(function (n) { return n.inHeader; }).map(function (n) {
        return '<a href="' + n.href + '"' + (n.key === active ? ' class="is-active"' : '') + '>' + n.label + '</a>';
      }).join('');

      this.innerHTML =
        '<header class="site-header" id="topo">' +
          '<div class="container site-header__inner">' +
            logo(false) +
            '<nav class="main-nav" aria-label="Navegação principal">' + links + '</nav>' +
            '<a href="#formulario" class="btn btn--cta">Verificar meus valores</a>' +
            '<button class="nav-toggle" aria-label="Abrir menu" aria-expanded="false">' +
              '<span></span><span></span><span></span>' +
            '</button>' +
          '</div>' +
        '</header>';
    }
  }

  /* ========================= LEAD FORM (→ RD Station) ============= */
  class MvLeadForm extends HTMLElement {
    connectedCallback() {
      this.innerHTML =
        '<section class="section section--blue" id="formulario">' +
          '<div class="container form-grid">' +
            '<div class="form-grid__intro">' +
              '<h2>Você tem dúvidas <span class="hl">sobre o processo?</span></h2>' +
              '<p class="lead" style="margin-top:var(--space-4)">Preencha o formulário abaixo. Nosso time vai analisar a sua situação e retornar para você.</p>' +
              '<p class="form-attention"><strong>ATENÇÃO:</strong> o atendimento continuará exclusivamente via whatsapp.</p>' +
            '</div>' +
            // data-rd-form: ponto de integração com o RD Station (substituir/embedar)
            '<form class="form-card lead-form" action="obrigado.html" method="post" data-rd-form>' +
              '<div class="field"><label for="lf-nome">Nome completo:*</label>' +
                '<input id="lf-nome" name="nome" type="text" placeholder="Seu nome" required></div>' +
              '<div class="field"><label for="lf-whats">WhatsApp:*</label>' +
                '<input id="lf-whats" name="whatsapp" type="tel" placeholder="+55 (00) 0 0000-0000" required></div>' +
              '<div class="field"><label for="lf-email">E-mail:*</label>' +
                '<input id="lf-email" name="email" type="email" placeholder="exemplo@email.com.br" required></div>' +
              '<button type="submit" class="btn btn--cta btn--arrow btn--block">' +
                '<span class="btn__icon">&rarr;</span> Peça mais informações</button>' +
            '</form>' +
          '</div>' +
        '</section>';
    }
  }

  /* ====================== FAIXA DE SEGURANÇA ====================== */
  class MvSecurityBanner extends HTMLElement {
    connectedCallback() {
      this.innerHTML =
        '<section class="band band--security">' +
          '<div class="container"><p>A Meu Valor nunca pede PIX, senha, código por SMS ou taxa para começar. ' +
          'Toda comunicação acontece somente pelos canais oficiais.</p></div>' +
        '</section>';
    }
  }

  /* ============================ FOOTER =========================== */
  class MvFooter extends HTMLElement {
    connectedCallback() {
      var nav = NAV.map(function (n) { return '<a href="' + n.href + '">' + n.label + '</a>'; }).join('');
      this.innerHTML =
        '<footer class="site-footer">' +
          '<div class="container footer__top">' +
            '<div class="footer__brand">' + logo(true) +
              '<p>Recuperação de valores esquecidos na Justiça para pessoas físicas.</p>' +
              '<div class="footer__social" aria-label="Redes sociais">' +
                '<a href="#" aria-label="Instagram"></a><a href="#" aria-label="WhatsApp"></a><a href="#" aria-label="E-mail"></a>' +
              '</div>' +
            '</div>' +
            '<nav class="footer__col" aria-label="Navegação do rodapé"><h4>Navegação</h4>' + nav + '</nav>' +
            '<div class="footer__col"><h4>Contato</h4>' +
              '<p>(51) 9 9984-7909</p><p>contato@recuperameuvalor.com.br</p><p>RS, SP e DF</p></div>' +
            '<div class="footer__col"><h4>Onde estamos</h4>' +
              '<p>Av. Diário de Notícias, 200, Cristal Tower, BarraShopping Sul, Porto Alegre/RS</p>' +
              '<a href="#" class="btn btn--cta btn--sm">Fale com a gente</a></div>' +
          '</div>' +
          '<div class="container footer__mid">' +
            '<div class="footer__vml"><span class="img-placeholder img-placeholder--sm">vml company</span>' +
              '<p>A força de um grupo com mais de 15 anos no mercado jurídico-financeiro</p></div>' +
            '<div class="footer__seals"><span>Reconhecimento da vml company:</span>' +
              '<div class="seals"><span class="seal"></span><span class="seal"></span><span class="seal"></span><span class="seal"></span></div>' +
            '</div>' +
          '</div>' +
          '<div class="container footer__bottom">' +
            '<p>©2026 Meu Valor. Todos os direitos reservados.</p>' +
            '<nav class="footer__legal" aria-label="Links legais">' +
              '<a href="#">Política de Privacidade</a><a href="#">Termo de Serviço</a><a href="#">Configurações de Cookies</a>' +
            '</nav>' +
          '</div>' +
        '</footer>';
    }
  }

  customElements.define('mv-header', MvHeader);
  customElements.define('mv-lead-form', MvLeadForm);
  customElements.define('mv-security-banner', MvSecurityBanner);
  customElements.define('mv-footer', MvFooter);
})();
