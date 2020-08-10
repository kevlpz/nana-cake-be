const express = require('express');
const server = express();
const session = require('express-session');
const helmet = require('helmet');
const Cors = require('cors');
require('dotenv').config();
const passport = require('passport');
const Users = require('./users/users-model');

const productsRouter = require('./products/products-router');
const usersRouter = require('./users/users-router');

const sessionConfig = {
    name: 'Banana',
    secret: process.env.SECRET,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 30, // 30 days
        secure: false, // true for production
        httpOnly: false
    },
    resave: false,
    saveUninitialized: true // false for production
}

server.use(Cors({
    origin: 'http://localhost:3000',
    credentials: true
}));
server.use(helmet());
server.use(express.json());
require('../passportConfig')(passport, Users);
server.use(session(sessionConfig));
server.use(passport.initialize());
server.use(passport.session());

server.use('/products', productsRouter);
server.use('/users', usersRouter);

module.exports = server;