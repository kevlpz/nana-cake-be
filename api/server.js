const express = require('express');
const server = express();
const session = require('express-session');
const helmet = require('helmet');
require('dotenv').config();

const productsRouter = require('./products/products-router');
const usersRouter = require('./users/users-router');

const sessionConfig = {
    name: 'Banana',
    secret: process.env.SECRET,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 30, // 30 days
        secure: false, // true for production
        httpOnly: true
    },
    resave: false,
    saveUninitialized: true // false for production
}

server.use(helmet());
server.use(express.json());
server.use(session(sessionConfig))

server.use('/products', productsRouter);
server.use('/users', usersRouter);

module.exports = server;