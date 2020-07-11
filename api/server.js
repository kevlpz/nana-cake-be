const express = require('express');
const server = express();

const productsRouter = require('./products/products-router');
const usersRouter = require('./users/users-router');

server.use(express.json());

server.use('/products', productsRouter);
server.use('/users', usersRouter);

module.exports = server;