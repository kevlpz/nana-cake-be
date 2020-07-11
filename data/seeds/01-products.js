
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('products').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('products').insert([
        {
          id: 1,
          name: 'Charmander',
          categoryID: '1',
          description: '100% yarn'
        },
        {
          id: 2,
          name: 'Squirtle',
          categoryID: '1',
          description: '100% yarn'
        },
        {
          id: 3,
          name: 'Bulbasaur',
          categoryID: '1',
          description: '100% yarn'
        }
      ]);
    });
};
