/**
 * testimonial.js
 * Carrossel de depoimentos. Os slides ficam direto no HTML (depoimentos.html),
 * cada um em .testimonial-slide; este script alterna qual está visível.
 */
document.addEventListener("components:ready", () => {
  const wrap = document.querySelector("[data-testimonial-carousel]");
  if (!wrap) return;

  const slides = Array.from(wrap.querySelectorAll(".testimonial-slide"));
  if (!slides.length) return;

  const prevBtn = wrap.querySelector("[data-testimonial-prev]");
  const nextBtn = wrap.querySelector("[data-testimonial-next]");
  let current = 0;

  function show(i) {
    current = (i + slides.length) % slides.length;
    slides.forEach((s, idx) => s.classList.toggle("is-active", idx === current));
  }

  if (slides.length <= 1) {
    if (prevBtn) prevBtn.style.display = "none";
    if (nextBtn) nextBtn.style.display = "none";
  } else {
    prevBtn.addEventListener("click", () => show(current - 1));
    nextBtn.addEventListener("click", () => show(current + 1));
  }

  show(0);
});
