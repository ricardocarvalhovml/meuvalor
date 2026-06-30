/* =========================================================
   Meu Valor — Protótipo Home
   Banner rotativo (vanilla, sem dependências) + menu mobile.
   Na versão WordPress, os slides virão do ACF e este mesmo
   comportamento pode ser mantido ou trocado por Swiper.js.
   ========================================================= */

(function () {
  'use strict';

  /* ---------- Banner rotativo ---------- */
  var slidesWrap = document.getElementById('heroSlides');
  if (slidesWrap) {
    var slides = Array.prototype.slice.call(slidesWrap.querySelectorAll('.hero__slide'));
    var dotsWrap = document.getElementById('heroDots');
    var prevBtn = document.getElementById('heroPrev');
    var nextBtn = document.getElementById('heroNext');
    var current = 0;
    var timer = null;
    var INTERVAL = 6000;

    // cria os dots
    slides.forEach(function (_, i) {
      var dot = document.createElement('button');
      dot.setAttribute('role', 'tab');
      dot.setAttribute('aria-label', 'Ir para o slide ' + (i + 1));
      if (i === 0) dot.classList.add('is-active');
      dot.addEventListener('click', function () { goTo(i); restart(); });
      dotsWrap.appendChild(dot);
    });

    function goTo(index) {
      slides[current].classList.remove('is-active');
      dotsWrap.children[current].classList.remove('is-active');
      current = (index + slides.length) % slides.length;
      slides[current].classList.add('is-active');
      dotsWrap.children[current].classList.add('is-active');
    }

    function next() { goTo(current + 1); }
    function prev() { goTo(current - 1); }

    function start() { timer = window.setInterval(next, INTERVAL); }
    function stop() { window.clearInterval(timer); }
    function restart() { stop(); start(); }

    if (nextBtn) nextBtn.addEventListener('click', function () { next(); restart(); });
    if (prevBtn) prevBtn.addEventListener('click', function () { prev(); restart(); });

    // pausa ao passar o mouse
    slidesWrap.addEventListener('mouseenter', stop);
    slidesWrap.addEventListener('mouseleave', start);

    if (slides.length > 1) start();
  }

  /* ---------- Menu mobile ---------- */
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.querySelector('.main-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }
})();
