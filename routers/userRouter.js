const express = require('express');

const Router = express.Router();

const {
  validatePassword,
  validateEmail,
  validateDisplayName,
} = require('../middlewares');

const { userController } = require('../controllers');

Router.post('/', [
  validateDisplayName,
  validateEmail,
  validatePassword,
  userController.create,
]);

Router.use((err, _req, res, _next) => {
  const { code, message } = err;
  return res.status(code).json({ message });
});

module.exports = Router;