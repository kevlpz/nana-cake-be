const db = require('../../data/knexConfig');

module.exports = {
    get,
    getById,
    add,
}

function get() {
    return db('products');
}

function getById(id) {
    return db('products')
        .where({id: id})
        .first();
}

function add(product) {
    return db('products')
        .insert(product, 'id')
        .then(([id]) => getById(id));
}