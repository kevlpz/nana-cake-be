const express = require('express');

const products = require('./products-model');

const router = express.Router();

router.get('/', (req, res) => {
    products.getProducts()
        .then(products => {
            res.status(200).json(products);
        })
        .catch(err => {
            console.log(err);
            res.status(404).json({error: 'Could not get products'});
        })
})

module.exports = router;