
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('categories').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('categories').insert([
        {id: 1, name: 'Crochet'},
        {id: 2, name: 'Stickers'},
        {id: 3, name: 'Buttons'}
      ]);
    });
};
