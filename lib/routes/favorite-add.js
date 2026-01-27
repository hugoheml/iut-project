'use strict';

const Joi = require('joi');

module.exports = {
	method: 'post',
	path: '/favorites/{movieId}',
	options: {
		auth: {
			scope: ['user', 'admin']
		},
		tags: ['api'],
		validate: {
			params: Joi.object({
				movieId: Joi.number().integer().required().description('ID of the movie to add to favorites')
			})
		}
	},
	handler: async (request, h) => {

		const { favoriteService } = request.services();
		const userId = request.auth.credentials.userId;

		return await favoriteService.add(userId, request.params.movieId);
	}
};
