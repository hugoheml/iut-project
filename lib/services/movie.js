'use strict';

const { Service } = require('@hapipal/schmervice');
const Boom = require('@hapi/boom');

module.exports = class MovieService extends Service {

	async create(movie) {

		const { Movie, User } = this.server.models();
		const { mailService } = this.server.services();

		const createdMovie = await Movie.query().insertAndFetch(movie);

		const users = await User.query();

		await Promise.all(users.map((user) => mailService.sendNewMovieMail(user, createdMovie)));

		return createdMovie;
	}

	getAll() {

		const { Movie } = this.server.models();

		return Movie.query();
	}

	getById(movieId) {

		const { Movie } = this.server.models();

		return Movie.query().findById(movieId);
	}

	async update(movieId, movie) {

		const { Movie, Favorite } = this.server.models();
		const { mailService } = this.server.services();

		const existingMovie = await Movie.query().findById(movieId);

		if (!existingMovie) {
			throw Boom.notFound('Movie not found');
		}

		const updatedMovie = await Movie.query().patchAndFetchById(movieId, movie);

		const favorites = await Favorite.query()
			.where('movieId', movieId)
			.withGraphFetched('user');

		await Promise.all(favorites.map((favorite) => mailService.sendMovieUpdatedMail(favorite.user, updatedMovie)));

		return updatedMovie;
	}

	async delete(movieId) {

		const { Movie } = this.server.models();

		const existingMovie = await Movie.query().findById(movieId);

		if (!existingMovie) {
			throw Boom.notFound('Movie not found');
		}

		return Movie.query().deleteById(movieId);
	}
};
