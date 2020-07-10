const db = require('../../data/knexConfig');

module.exports = {
    getProducts
}

function getProducts() {
    return db('products');
}