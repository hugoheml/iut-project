'use strict';

const { Service } = require('@hapipal/schmervice');
const Boom = require('@hapi/boom');

module.exports = class FavoriteService extends Service {

	async add(userId, movieId) {

		const { Favorite, Movie } = this.server.models();

		const movie = await Movie.query().findById(movieId);

		if (!movie) {
			throw Boom.notFound('Movie not found');
		}

		const existingFavorite = await Favorite.query()
			.where('userId', userId)
			.where('movieId', movieId)
			.first();

		if (existingFavorite) {
			throw Boom.conflict('This movie is already in your favorites');
		}

		return Favorite.query().insertAndFetch({
			userId,
			movieId
		});
	}

	async remove(userId, movieId) {

		const { Favorite } = this.server.models();

		const existingFavorite = await Favorite.query()
			.where('userId', userId)
			.where('movieId', movieId)
			.first();

		if (!existingFavorite) {
			throw Boom.notFound('This movie is not in your favorites');
		}

		await Favorite.query()
			.where('userId', userId)
			.where('movieId', movieId)
			.delete();

		return { message: 'Movie removed from favorites' };
	}

	async getByUser(userId) {

		const { Favorite } = this.server.models();

		return Favorite.query()
			.where('userId', userId)
			.withGraphFetched('movie');
	}
};
