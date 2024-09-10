const express = require('express');
const bodyParser = require('body-parser');
const cassandraClient = 
require('./cassandra-config');

const { v4: uuidv4 } = require('uuid');

const app = express();
const port = 3000;

app.use(bodyParser.json());

// Rota GET para obter todas as divas
app.get('/divas', async (req, res) => {
  try {
    const result = await cassandraClient.
    execute('SELECT * FROM pop_divas');
    res.json(result.rows);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Rota POST para adicionar uma nova diva
app.post('/divas', async (req, res) => {
  const { name, genre } = req.body;

  if (!name || !genre) {
    return res.status(400).send('Name and genre are required');
  }

  const id = uuidv4();
  
  try {
    await cassandraClient.execute(
      'INSERT INTO pop_divas (diva_id, name, genre) VALUES (?, ?, ?)',
      [id, name, genre],
      { prepare: true }
    );
    res.status(201).send(`Diva ${name} 
    added with ID ${id}`);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.listen(port, () => {
  console.log(`Server running on 
  http://localhost:${port}`);
});