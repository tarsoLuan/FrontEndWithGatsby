const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.get('/api/data', (req, res) => {
  // Simulando dados dinâmicos para a página
  const data = {
    message: 'Dados dinâmicos do backend!',
    timestamp: new Date().toISOString(),
  };

  res.json(data);
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Servidor Node.js rodando na porta ${PORT}`);
});