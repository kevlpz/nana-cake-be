const express = require('express');
const server = express();

const productsRouter = require('./products/products-router');

server.use(express.json());

server.use('/products', productsRouter);

module.exports = server;