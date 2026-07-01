/**
 * nav.js
 * Menu mobile (abre/fecha) + destaque do link da página atual.
 */
document.addEventListener("components:ready", () => {
  const toggle = document.querySelector(".nav-toggle");
  const navList = document.querySelector(".nav-list");

  if (toggle && navList) {
    toggle.addEventListener("click", () => {
      const isOpen = navList.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(isOpen));
    });
  }

  // Destaca o item da página atual no menu (header) e no rodapé
  const here = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-list a, .footer-col a").forEach((a) => {
    if (a.getAttribute("href") === here) a.classList.add("is-active");
  });
});
