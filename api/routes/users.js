const express = require('express');
const rescue = require('express-rescue');

const route = express.Router();

const { createUser, getUsers, getUserById } = require('../controllers/users');
const { validateUserPayload } = require('../middlewares/users');
const validateToken = require('../middlewares/auth');

route.post('/', validateUserPayload, rescue(createUser));
route.get('/', validateToken, rescue(getUsers));
route.get('/:id', validateToken, rescue(getUserById));

module.exports = route;
