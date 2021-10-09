const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

const { env: { PORT } } = process;

app.listen(PORT, () => console.log(`ouvindo porta ${PORT}!`));
