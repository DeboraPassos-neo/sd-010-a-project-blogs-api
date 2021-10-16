const bodyParser = require('body-parser');
const express = require('express');

const app = express();

app.use(bodyParser.json());

app.use(bodyParser.urlencoded());

// ---------------------------------------------------- USERS ---------------------------------------------------- //

const { userRouter, loginRouter } = require('./routers');

app.use('/user', userRouter);

app.use('/login', loginRouter);

app.listen(3000, () => console.log('ouvindo porta 3000!'));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});
