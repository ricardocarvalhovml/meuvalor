/**
 * faq.js
 * Controla o acordeão (sanfona) das perguntas frequentes.
 * As perguntas/respostas ficam direto no HTML (contato.html); este script
 * apenas gerencia abrir/fechar.
 */
document.addEventListener("components:ready", () => {
  const items = Array.from(document.querySelectorAll(".faq-item"));
  if (!items.length) return;

  items.forEach((item) => {
    const btn = item.querySelector(".faq-question");
    const answer = item.querySelector(".faq-answer");
    if (!btn || !answer) return;

    btn.addEventListener("click", () => {
      const isOpen = btn.getAttribute("aria-expanded") === "true";

      // fecha todos
      items.forEach((other) => {
        other.querySelector(".faq-question").setAttribute("aria-expanded", "false");
        other.querySelector(".faq-answer").style.maxHeight = null;
      });

      // abre o clicado (se estava fechado)
      if (!isOpen) {
        btn.setAttribute("aria-expanded", "true");
        answer.style.maxHeight = answer.scrollHeight + "px";
      }
    });
  });
});
