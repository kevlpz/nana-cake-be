const db = require('../../data/knexConfig');

module.exports = {
    get,
    getById,
    add,
    update
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

function update(id, product) {
    return db('products')
        .where({id: id})
        .update(product, 'id')
        .then(count => {
            if(count > 0) {
                return getById(id)
            }
        });
}