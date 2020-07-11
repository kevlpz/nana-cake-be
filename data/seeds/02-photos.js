
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('photos').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('photos').insert([
        {id: 1, productID: 1, url: 'charmander url'},
        {id: 2, productID: 2, url: 'squirtle url'},
        {id: 3, productID: 3, url: 'bulbasaur url'}
      ]);
    });
};
