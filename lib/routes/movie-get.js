'use strict';

const Joi = require('joi');
const Boom = require('@hapi/boom');

module.exports = {
	method: 'get',
	path: '/movie/{id}',
	options: {
		auth: {
			scope: ['user', 'admin']
		},
		tags: ['api'],
		validate: {
			params: Joi.object({
				id: Joi.number().integer().required().description('ID of the movie')
			})
		}
	},
	handler: async (request, h) => {

		const { movieService } = request.services();

		const movie = await movieService.getById(request.params.id);

		if (!movie) {
			throw Boom.notFound('Movie not found');
		}

		return movie;
	}
};
