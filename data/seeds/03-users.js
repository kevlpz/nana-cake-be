
const bcrypt = require('bcrypt');

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {id: 1, username: 'King', password: bcrypt.hashSync('123', 10), admin: true},
        {id: 2, username: 'Bishop', password: '123', admin: false},
        {id: 3, username: 'Knight', password: '123', admin: false}
      ]);
    });
};
