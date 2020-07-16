const express = require('express');

const Products = require('./products-model');

const router = express.Router();

// get all products
router.get('/', (req, res) => {
    Products.get()
        .then(items => {
            res.status(200).json(items);
        })
        .catch(err => {
            console.log(err);
            res.status(404).json({error: 'Could not get products'});
        });
});

// get crochet
router.get('/crochet', (req, res) => {
    Products.getCrochet()
        .then(products => {
            res.status(200).json(products);
        })
        .catch(err => {
            console.log(err);
            res.status(404).json({error: 'Could not get products'});
        });
});

// get stickers
router.get('/stickers', (req, res) => {
    Products.getStickers()
        .then(products => {
            res.status(200).json(products);
        })
        .catch(err => {
            console.log(err);
            res.status(404).json({error: 'Could not get products'});
        });
});

// get buttons
router.get('/buttons', (req, res) => {
    Products.getButtons()
        .then(products => {
            res.status(200).json(products);
        })
        .catch(err => {
            console.log(err);
            res.status(404).json({error: 'Could not get products'});
        });
});

// post product
router.post('/', (req, res) => {
    const data = req.body;

    if(data.name && data.categoryID) {
        Products.add(data)
            .then(product => res.status(201).json(product))
            .catch(err => {
                console.log(err);
                res.status(500).json({error: 'Internal server error'});
            });
    } else {
        res.status(400).json({error: 'Must include product name and category'});
    }
});

// update product
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const data = req.body;

    if(data) {
        Products.update(id, data)
            .then(product => res.status(201).json(product))
            .catch(err => {
                console.log(err);
                res.status(500).json({error: 'Internal server error'});
            });
    } else {
        res.status(400).json({error: 'Must provide information to update'});
    }
});

// delete product
router.delete('/:id', (req, res) => {
    const { id } = req.params;

    Products.del(id)
        .then(() => res.status(200).end())
        .catch(err => {
            console.log(err);
            res.status(500).json({error: 'Internal server error'});
        });
});

module.exports = router;