const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const sqlite3 = require("sqlite3").verbose();

const app = express();
const PORT = 3000;

// Configurações
app.use(cors());
app.use(bodyParser.json());

// Banco de dados SQLite
const db = new sqlite3.Database("./restaurantes.db");

// Inicialização do banco
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS restaurantes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL,
      descricao TEXT,
      endereco TEXT,
      latitude REAL,
      longitude REAL
    )
  `);
});

// Rotas
app.get("/restaurantes", (req, res) => {
  const { latitude, longitude } = req.query;

  // Exemplo: Retornar todos os restaurantes sem filtro por proximidade
  db.all("SELECT * FROM restaurantes", [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

app.listen(PORT, () => console.log(`API rodando em http://localhost:${PORT}`));
