/**
 * banner.js
 * Carrossel de banners: troca automática (autoplay), pausa quando o mouse
 * está em cima e bolinhas (dots) de navegação. Setas são opcionais.
 *
 * HTML esperado:
 * <div class="banner-carousel" data-autoplay="6000">
 *   <div class="banner-track">
 *     <div class="banner-slide">...</div>
 *     ...
 *   </div>
 *   <div class="banner-dots"></div>
 * </div>
 */

function initCarousel(carousel) {
  const track = carousel.querySelector(".banner-track");
  const slides = Array.from(track.children);
  const dotsWrap = carousel.querySelector(".banner-dots");
  const prevBtn = carousel.querySelector(".banner-prev");
  const nextBtn = carousel.querySelector(".banner-next");
  const autoplayMs = Number(carousel.dataset.autoplay) || 0;

  let current = 0;
  let timer = null;

  if (dotsWrap) {
    slides.forEach((_, i) => {
      const dot = document.createElement("button");
      dot.className = "banner-dot";
      dot.setAttribute("aria-label", `Ir para slide ${i + 1}`);
      dot.addEventListener("click", () => goTo(i));
      dotsWrap.appendChild(dot);
    });
  }

  function update() {
    track.style.transform = `translateX(-${current * 100}%)`;
    if (dotsWrap) {
      dotsWrap.querySelectorAll(".banner-dot").forEach((d, i) => {
        d.classList.toggle("is-active", i === current);
      });
    }
  }

  function goTo(index) {
    current = (index + slides.length) % slides.length;
    update();
    restartAutoplay();
  }

  function next() { goTo(current + 1); }
  function prev() { goTo(current - 1); }

  function startAutoplay() {
    if (!autoplayMs || slides.length <= 1) return;
    timer = setInterval(next, autoplayMs);
  }
  function stopAutoplay() { clearInterval(timer); }
  function restartAutoplay() { stopAutoplay(); startAutoplay(); }

  if (nextBtn) nextBtn.addEventListener("click", next);
  if (prevBtn) prevBtn.addEventListener("click", prev);

  // Pausa quando o mouse está sobre o banner
  carousel.addEventListener("mouseenter", stopAutoplay);
  carousel.addEventListener("mouseleave", startAutoplay);

  update();
  startAutoplay();
}

document.addEventListener("components:ready", () => {
  document.querySelectorAll(".banner-carousel").forEach(initCarousel);
});
