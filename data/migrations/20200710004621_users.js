
exports.up = function(knex) {
  return knex.schema
    .createTable('users', tbl => {
        tbl.increments('id');
        tbl.string('username').notNullable().unique();
        tbl.string('password').notNullable();
    })
    .createTable('categories', tbl => {
        tbl.increments('id');
        tbl.string('name').notNullable().unique();
    })
    .createTable('products', tbl => {
        tbl.increments('id');
        tbl.string('name').notNullable().unique();
        tbl
            .integer('categoryID')
            .unsigned()
            .notNullable()
            .references('id')
            .inTable('categories')
            .onDelete("CASCADE")
            .onUpdate("CASCADE");
        tbl.string('description');
    })
    .createTable('photos', tbl => {
        tbl.increments('id');
        tbl
            .integer('productID')
            .unsigned()
            .notNullable()
            .references('id')
            .inTable('products')
            .onDelete("CASCADE")
            .onUpdate("CASCADE");
        tbl.string('url').notNullable().unique();
    })
};

exports.down = function(knex) {
  
};
