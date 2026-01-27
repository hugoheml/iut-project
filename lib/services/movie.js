'use strict';

const { Service } = require('@hapipal/schmervice');
const Boom = require('@hapi/boom');

module.exports = class MovieService extends Service {

	create(movie) {

		const { Movie } = this.server.models();

		return Movie.query().insertAndFetch(movie);
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

		const { Movie } = this.server.models();

		const existingMovie = await Movie.query().findById(movieId);

		if (!existingMovie) {
			throw Boom.notFound('Movie not found');
		}

		return Movie.query().patchAndFetchById(movieId, movie);
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
