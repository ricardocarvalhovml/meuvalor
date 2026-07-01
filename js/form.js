/**
 * form.js
 * Validação simples + envio do formulário padrão.
 * O endpoint abaixo é um placeholder — troque pela URL que o time de dados
 * definir para o backend (provavelmente uma rota do WordPress headless).
 */

const FORM_ENDPOINT = "https://exemplo-endpoint-time-de-dados.com/api/contato";

document.addEventListener("components:ready", () => {
  const form = document.getElementById("contact-form");
  if (!form) return;

  const feedback = form.querySelector(".form-feedback");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    if (!form.checkValidity()) {
      feedback.textContent = "Preencha todos os campos obrigatórios.";
      return;
    }

    const data = Object.fromEntries(new FormData(form).entries());

    feedback.textContent = "Enviando...";

    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Falha no envio");

      feedback.textContent = "Mensagem enviada com sucesso!";
      form.reset();
      window.location.href = "obrigado.html";
    } catch (err) {
      console.error(err);
      feedback.textContent = "Não foi possível enviar agora. Tente novamente.";
    }
  });
});
