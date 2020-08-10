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
        .then(products => {
            return db('photos')
                .then(photos => {
                    const items = {
                        products: products,
                        photos: photos
                    }
                    return items;
                });
        });
}

function getCrochet() {
    return db('products')
        .where({categoryID: 1})
        .then(products => {
            return db('photos')
                .then(photos => {
                    const items = {
                        products: products,
                        photos: photos.filter(photo => photo.productID === 1)
                    }
                    return items;
                });
        });
}

function getStickers() {
    return db('products')
        .where({categoryID: 2})
        .then(products => {
            return db('photos')
                .then(photos => {
                    const items = {
                        products: products,
                        photos: photos.filter(photo => photo.productID === 2)
                    }
                    return items;
                });
        });
}

function getButtons() {
    return db('products')
    .where({categoryID: 3})
    .then(products => {
        return db('photos')
            .then(photos => {
                const items = {
                    products: products,
                    photos: photos.filter(photo => photo.productID === 3)
                }
                return items;
            });
    });
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
                return getById(id);
            }
        });
}

function del(id) {
    return db('products')
        .where({id: id})
        .del();
}