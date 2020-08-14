const db = require('../../data/knexConfig');

module.exports = {
    get,
    getById,
    getByUsername,
    add,
    changePassword
}

function get() {
    return db('users')
}

function getById(id) {
    return db('users')
    .where({id: id})
    .first();
}

function getByUsername(username) {
    return db('users')
    .where({username: username})
    .first();
}

function add(user) {
    return db('users')
        .insert(user, 'id')
        .then(([id]) => getById(id));
}

function changePassword(id, newPassword) {
    return('users')
        .where({id: id})
        .first()
        .update({
            password: newPassword
        });
}