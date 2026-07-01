/**
 * include.js
 * Injeta os componentes reutilizáveis (parciais) em cada página:
 *   <div data-include="components/header.html"></div>
 *   <div data-include="components/form.html"></div>
 *   <div data-include="components/footer.html"></div>
 *
 * Depois de injetar, dispara o evento "components:ready" para que os scripts
 * de comportamento (nav, banner, faq, testimonial, form) inicializem com o
 * DOM já completo.
 *
 * NÃO há content.json: o conteúdo vive direto no HTML de cada página (melhor
 * para SEO e para o time de dados "embrulhar" com os campos do WordPress).
 */

async function injectPartials() {
  const targets = document.querySelectorAll("[data-include]");
  await Promise.all(
    Array.from(targets).map(async (el) => {
      const path = el.getAttribute("data-include");
      try {
        const res = await fetch(path);
        if (!res.ok) throw new Error("HTTP " + res.status);
        el.outerHTML = await res.text();
      } catch (err) {
        console.error("Falha ao carregar parcial: " + path, err);
      }
    })
  );
}

document.addEventListener("DOMContentLoaded", async () => {
  await injectPartials();
  document.dispatchEvent(new CustomEvent("components:ready"));
});
