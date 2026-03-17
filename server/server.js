const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3001;

// Habilita o CORS para que o React (geralmente na porta 3000) possa acessar este servidor
app.use(cors());

// Rota que o nosso React vai chamar
app.get('/api/coffee', async (req, res) => {
  try {
    // Mantemos a estratégia de quebra de cache aqui no backend!
    const timestamp = new Date().getTime();
    const apiUrl = `https://coffee.alexflipnote.dev/random.json?t=${timestamp}`;

    // O Node faz a requisição diretamente para a API original.
    // Nota: O fetch nativo funciona no Node a partir da versão 18.
    const response = await fetch(apiUrl);
    
    if (!response.ok) {
      throw new Error('A API original retornou um erro.');
    }

    const data = await response.json();
    
    // Repassa o JSON intacto para o nosso frontend
    res.json(data);
  } catch (error) {
    console.error('Erro no servidor:', error.message);
    res.status(500).json({ error: 'Erro interno ao buscar o café no servidor.' });
  }
});

app.listen(PORT, () => {
  console.log(`☕ Servidor backend rodando na porta http://localhost:${PORT}`);
});