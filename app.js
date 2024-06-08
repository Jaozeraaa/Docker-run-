const express = require("express");
const mysql = require('mysql2');
const os = require("os");
require('dotenv').config();

const app = express();

// Configurações do banco de dados
const connection = mysql.createConnection({
  host: process.env.DB_HOST ?? "localhost",
  port: 3306,
  user: 'user',
  password: '1234',
  database: 'api'
});

// Conectar ao banco de dados
connection.connect((error) => {
  if (error) {
    console.error('Erro ao conectar ao banco de dados:', error);
    return;
  }
  console.log(`Conexão ao banco de dados bem-sucedida.`);
});

// Rota para consultar dados
app.get("/consulta-dados", (req, res) => {
    const query = "SELECT * FROM pessoa";
    connection.query(query, (error, results) => {
      if (error) {
        console.error('Erro ao executar a consulta:', error);
        return res.status(500).json({ error: 'Erro ao consultar dados.' });
      }
      res.json(results);
    });
  });

// Rota padrão
app.get("/", (req, res) => {
  res.status(200).json({ message: "Olá" });
});

// Rota de verificação de saúde
app.get("/liveness", (req, res) => {
  res.status(200).json({
    message: "Meu app está vivo!",
    path: process.cwd(),
    gid: process.getegid(),
    uid: process.geteuid(),
    date: new Date().getTime()
  });
});

// Rota de verificação de prontidão
app.get("/readiness", (req, res) => {
  res.status(200).json({
    message: "Meu app está pronto!",
    platform: os.platform(),
    freemem: os.freemem(),
    homedir: os.homedir(),
    date: new Date().getTime()
  });
});

module.exports = app;


