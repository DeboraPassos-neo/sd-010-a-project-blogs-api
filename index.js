const express = require('express');
const bodyParser = require('body-parser');
const userMiddlewares = require('./middlewares/middlewaresUser');
const userControllers = require('./controllers/userControllers');
const categoriesControllers = require('./controllers/categoriesControllers');
const categoriesMiddlewares = require('./middlewares/categoriesMiddlewares');
const postMiddlewares = require('./middlewares/postMiddlewares');
const postControllers = require('./controllers/postControllers');

const app = express();

app.use(bodyParser.json());

app.listen(3000, () => console.log('ouvindo porta 3000!'));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

// user

app.post('/user',
 userMiddlewares.validateDisplayName,
 userMiddlewares.validateEmail,
 userMiddlewares.validatePassword,
 userMiddlewares.validateEmailAlreadyExists,
 userControllers.createUser);

app.post('/login',
   userMiddlewares.validateEmail,
   userMiddlewares.validatePassword,
   userMiddlewares.validateUserExists,
   userControllers.login);

app.get('/user', 
userMiddlewares.validateTokenFn,
userControllers.getUsers);

app.get('/user/:id',
 userMiddlewares.validateTokenFn,
 userMiddlewares.verifyUserExistsById,
 userControllers.getUserById);

app.delete('/user/me', 
 postMiddlewares.validateTokenFn,
 postMiddlewares.searchUser,
 userControllers.deleteUser);

//  categories

app.post('/categories',
   categoriesMiddlewares.validateName,
   categoriesMiddlewares.validateTokenFn,
   categoriesControllers.createNewCategory);

app.get('/categories', 
 categoriesMiddlewares.validateTokenFn,
 categoriesControllers.getAllCategories);

//  post

app.post('/post',
postMiddlewares.validateCategoryId,
postMiddlewares.validateContent,
postMiddlewares.validateTitle,
postMiddlewares.validateTokenFn,
  postMiddlewares.searchUser,
  postMiddlewares.verifyCategoryIdExists,
  postControllers.createPost);

app.get('/post', 
 postMiddlewares.validateTokenFn,
 postControllers.getAll);

app.get('/post/:id', 
 postMiddlewares.validateTokenFn,
 postControllers.getById);

app.put('/post/:id', 
postMiddlewares.validateTitle,
postMiddlewares.validateContent,
postMiddlewares.validateFieldsOfReq,
postMiddlewares.validateTokenFn, 
postMiddlewares.searchUser,
postMiddlewares.validateUserAuth,
postControllers.updatePost);

app.delete('/post/:id',
postMiddlewares.verifyPostExist,
 postMiddlewares.validateTokenFn,
 postMiddlewares.searchUser,
 postMiddlewares.validateUserAuth,
 postControllers.deletePost);