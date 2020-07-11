const db = require('../../data/knexConfig');

module.exports = {
    get,
    getById,
    add
}

function get() {
    return db('users')
}

function getById(id) {
    return db('users')
    .where({id: id})
    .first();
}

function add(user) {
    return db('users')
        .insert(user, 'id')
        .then(([id]) => getById(id));
}