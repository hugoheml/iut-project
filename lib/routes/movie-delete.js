'use strict';

const Joi = require('joi');

module.exports = {
	method: 'delete',
	path: '/movie/{id}',
	options: {
		auth: {
			scope: ['admin']
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

		await movieService.delete(request.params.id);

		return h.response().code(204);
	}
};
