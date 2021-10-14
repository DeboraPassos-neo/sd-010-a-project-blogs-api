const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const { PORT } = process.env || 3000;

const app = express();
app.use(bodyParser.json());

app.listen(PORT, () => console.log(`Servidor conectado na porta ${PORT}!`));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});
