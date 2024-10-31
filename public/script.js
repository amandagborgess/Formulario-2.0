document
  .getElementById("feedbackForm")
  .addEventListener("submit", async function (e) {
    e.preventDefault(); // Previne o envio padrão do formulário

    const name = document.getElementById("name").value;
    const age = document.getElementById("age").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const feedback = document.getElementById("feedback").value;
    const suggestions = document.getElementById("suggestions").value;

    const response = await fetch("/feedback", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, age, email, phone, feedback, suggestions }),
    });

    const messageDiv = document.getElementById("message");
    if (response.ok) {
      messageDiv.textContent = "Feedback enviado com sucesso!";
      messageDiv.style.color = "#28a745"; // Verde
      document.getElementById("feedbackForm").reset(); // Limpa o formulário
    } else {
      messageDiv.textContent = "Erro ao enviar feedback. Tente novamente.";
      messageDiv.style.color = "#dc3545"; // Vermelho
    }
  });
