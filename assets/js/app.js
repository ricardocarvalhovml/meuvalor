/* =============================================================
   MEU VALOR — interações
   Banner rotativo + FAQ accordion + menu mobile.
   Usa delegação de eventos para funcionar mesmo com componentes
   (Web Components) que renderizam após o carregamento.
   ============================================================= */

(function () {
  'use strict';

  /* -------------------- Banner rotativo (hero) -------------------- */
  function initCarousel() {
    var root = document.querySelector('[data-carousel]');
    if (!root) return;
    var slides = Array.prototype.slice.call(root.querySelectorAll('.hero__slide'));
    if (slides.length < 1) return;
    var dotsWrap = root.querySelector('[data-dots]');
    var current = 0, timer = null, INTERVAL = 6000;

    slides.forEach(function (_, i) {
      var b = document.createElement('button');
      b.setAttribute('aria-label', 'Ir para o slide ' + (i + 1));
      if (i === 0) b.className = 'is-active';
      b.addEventListener('click', function () { go(i); restart(); });
      if (dotsWrap) dotsWrap.appendChild(b);
    });

    function go(i) {
      slides[current].classList.remove('is-active');
      if (dotsWrap) dotsWrap.children[current].classList.remove('is-active');
      current = (i + slides.length) % slides.length;
      slides[current].classList.add('is-active');
      if (dotsWrap) dotsWrap.children[current].classList.add('is-active');
    }
    function next() { go(current + 1); }
    function prev() { go(current - 1); }
    function start() { if (slides.length > 1) timer = setInterval(next, INTERVAL); }
    function stop() { clearInterval(timer); }
    function restart() { stop(); start(); }

    var nx = root.querySelector('[data-next]'), pv = root.querySelector('[data-prev]');
    if (nx) nx.addEventListener('click', function () { next(); restart(); });
    if (pv) pv.addEventListener('click', function () { prev(); restart(); });
    root.addEventListener('mouseenter', stop);
    root.addEventListener('mouseleave', start);
    start();
  }

  /* -------------------- FAQ accordion -------------------- */
  document.addEventListener('click', function (e) {
    var q = e.target.closest('.faq__q');
    if (q) {
      var item = q.closest('.faq__item');
      var open = item.classList.toggle('is-open');
      q.setAttribute('aria-expanded', open ? 'true' : 'false');
      var tog = q.querySelector('.faq__toggle');
      if (tog) tog.textContent = open ? '×' : '+';   // × / +
    }

    /* -------------------- Menu mobile -------------------- */
    var toggle = e.target.closest('.nav-toggle');
    if (toggle) {
      var nav = document.querySelector('.main-nav');
      if (nav) {
        var isOpen = nav.classList.toggle('is-open');
        toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      }
    }
  });

  if (document.readyState !== 'loading') initCarousel();
  else document.addEventListener('DOMContentLoaded', initCarousel);
})();
