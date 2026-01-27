'use strict';

const Joi = require('joi');

module.exports = {
	method: 'patch',
	path: '/movie/{id}',
	options: {
		auth: {
			scope: ['admin']
		},
		tags: ['api'],
		validate: {
			params: Joi.object({
				id: Joi.number().integer().required().description('ID of the movie')
			}),
			payload: Joi.object({
				title: Joi.string().min(1).max(255).example('Inception').description('Title of the movie'),
				description: Joi.string().min(1).example('A thief who steals corporate secrets...').description('Description of the movie'),
				releaseDate: Joi.date().example('2010-07-16').description('Release date of the movie'),
				director: Joi.string().min(1).max(255).example('Christopher Nolan').description('Director of the movie')
			}).min(1)
		}
	},
	handler: async (request, h) => {

		const { movieService } = request.services();

		return await movieService.update(request.params.id, request.payload);
	}
};
