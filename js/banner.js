/**
 * banner.js
 * Carrossel simples, sem dependência externa.
 * HTML esperado:
 * <div class="banner-carousel" data-autoplay="5000">
 *   <div class="banner-track">
 *     <div class="banner-slide">...</div>
 *     <div class="banner-slide">...</div>
 *   </div>
 *   <button class="banner-prev">‹</button>
 *   <button class="banner-next">›</button>
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

  slides.forEach((_, i) => {
    const dot = document.createElement("button");
    dot.className = "banner-dot";
    dot.setAttribute("aria-label", `Ir para slide ${i + 1}`);
    dot.addEventListener("click", () => goTo(i));
    dotsWrap.appendChild(dot);
  });

  function update() {
    track.style.transform = `translateX(-${current * 100}%)`;
    dotsWrap.querySelectorAll(".banner-dot").forEach((d, i) => {
      d.classList.toggle("is-active", i === current);
    });
  }

  function goTo(index) {
    current = (index + slides.length) % slides.length;
    update();
    resetAutoplay();
  }

  function next() {
    goTo(current + 1);
  }

  function prev() {
    goTo(current - 1);
  }

  function resetAutoplay() {
    if (!autoplayMs) return;
    clearInterval(timer);
    timer = setInterval(next, autoplayMs);
  }

  nextBtn.addEventListener("click", next);
  prevBtn.addEventListener("click", prev);

  update();
  resetAutoplay();
}

document.addEventListener("components:ready", () => {
  document.querySelectorAll(".banner-carousel").forEach(initCarousel);
});
