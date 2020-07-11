const db = require('../../data/knexConfig');

module.exports = {
    get
}

function get() {
    return db('users')
}