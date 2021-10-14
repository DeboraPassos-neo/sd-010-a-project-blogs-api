require('dotenv').config();
const express = require('express');

const userRoutes = require('./routes/user');
const loginRoutes = require('./routes/login');
const categoriesRoutes = require('./routes/categories');

const app = express();

app.use(express.json());

app.listen(3000, () => console.log('ouvindo porta 3000!'));

app.use('/user', userRoutes);
app.use('/login', loginRoutes);
app.use('/categories', categoriesRoutes);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});
