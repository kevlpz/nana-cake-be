const express = require('express');

const Products = require('./products-model');

const router = express.Router();

router.get('/', (req, res) => {
    Products.get()
        .then(products => {
            res.status(200).json(products);
        })
        .catch(err => {
            console.log(err);
            res.status(404).json({error: 'Could not get products'});
        })
})

router.post('/', (req, res) => {
    const data = req.body;

    if(data.name && data.categoryID) {
        Products.add(data)
            .then(product => res.status(201).json(product))
            .catch(err => {
                console.log(err);
                res.status(500).json({error: 'Cannot fulfil request at this time.'});
            })
    } else {
        res.status(400).json({error: 'Must include product name and category'});
    }
})

module.exports = router;