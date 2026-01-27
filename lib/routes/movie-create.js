'use strict';

const Joi = require('joi');

module.exports = {
	method: 'post',
	path: '/movie',
	options: {
		auth: {
			scope: ['admin']
		},
		tags: ['api'],
		validate: {
			payload: Joi.object({
				title: Joi.string().required().min(1).max(255).example('Inception').description('Title of the movie'),
				description: Joi.string().required().min(1).example('A thief who steals corporate secrets through the use of dream-sharing technology...').description('Description of the movie'),
				releaseDate: Joi.date().required().example('2010-07-16').description('Release date of the movie'),
				director: Joi.string().required().min(1).max(255).example('Christopher Nolan').description('Director of the movie')
			})
		}
	},
	handler: async (request, h) => {

		const { movieService } = request.services();

		return await movieService.create(request.payload);
	}
};
