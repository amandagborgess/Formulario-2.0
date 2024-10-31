const express = require("express");
const fs = require("fs");
const bodyParser = require("body-parser");

const app = express();
const PORT = 4000; // Mudando a porta para 4000

// Middleware
app.use(express.static("public"));
app.use(bodyParser.json());

// Rota para receber feedback
app.post("/feedback", (req, res) => {
  const newFeedback = req.body;

  // Lê os feedbacks existentes
  fs.readFile("feedbacks.json", (err, data) => {
    if (err) {
      return res.status(500).send("Erro ao ler feedbacks.");
    }

    const feedbacks = JSON.parse(data);
    feedbacks.push(newFeedback);

    // Grava os novos feedbacks no arquivo
    fs.writeFile(
      "feedbacks.json",
      JSON.stringify(feedbacks, null, 2),
      (err) => {
        if (err) {
          return res.status(500).send("Erro ao salvar feedback.");
        }
        res.status(200).send("Feedback enviado com sucesso!");
      }
    );
  });
});

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`); // Atualizando a mensagem para a nova porta
});
