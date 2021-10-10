const bodyParser = require('body-parser');
const express = require('express');
const Users = require('./src/controllers/users');
const Login = require('./src/controllers/login');
const Categories = require('./src/controllers/categories');
const Posts = require('./src/controllers/posts');
const { authToken } = require('./src/middlewares/authToken');

const app = express();
app.use(bodyParser.json());

const { PORT } = process.env;

app.listen(PORT, () => console.log(`ouvindo porta ${PORT}!`));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

// User
app.post('/user', Users.create);
app.get('/user', authToken, Users.getAll);
app.get('/user/:id', authToken, Users.getById);
app.delete('/user/me', authToken, Users.remove);

// Login
app.post('/login', Login.userLogin);

// Categories
app.post('/categories', authToken, Categories.create);
app.get('/categories', authToken, Categories.getAll);

// Posts
app.post('/post', authToken, Posts.create);
app.get('/post', authToken, Posts.getAll);
app.get('/post/:id', authToken, Posts.getById);
app.put('/post/:id', authToken, Posts.update);
app.delete('/post/:id', authToken, Posts.remove);