const db = require('../../data/knexConfig');

module.exports = {
    get,
    getCrochet,
    getStickers,
    getButtons,
    getById,
    add,
    update,
    del
}

function get() {
    return db('products')
        .join('photos', 'products.id', '=', 'photos.productID')
        .select('product.id', 'name', 'categoryID', 'description', 'url')
}

function getCrochet() {
    return db('products')
        .where({categoryID: 1})
        .join('photos', 'products.id', '=', 'photos.productID')
        .select('products.id', 'name', 'categoryID', 'description', 'url')
}

function getStickers() {
    return db('products')
        .where({categoryID: 2})
        .join('photos', 'products.id', '=', 'photos.productID')
        .select('products.id', 'name', 'categoryID', 'description', 'url')
}

function getButtons() {
    return db('products')
        .where({categoryID: 3})
        .join('photos', 'products.id', '=', 'photos.productID')
        .select('products.id', 'name', 'categoryID', 'description', 'url')
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

function del(id) {
    return db('products')
        .where({id: id})
        .del();
}