'use strict';

module.exports = {

	async up(knex) {

		await knex.schema.createTable('favorite', (table) => {

			table.increments('id').primary();
			table.integer('userId').unsigned().notNull();
			table.integer('movieId').unsigned().notNull();

			table.foreign('userId').references('id').inTable('user').onDelete('CASCADE');
			table.foreign('movieId').references('id').inTable('movie').onDelete('CASCADE');

			table.unique(['userId', 'movieId']);

			table.dateTime('createdAt').notNull().defaultTo(knex.fn.now());
		});
	},

	async down(knex) {

		await knex.schema.dropTableIfExists('favorite');
	}
};
