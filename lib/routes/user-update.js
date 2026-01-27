'use strict';

const Joi = require('joi');

module.exports = {
	method: 'patch',
	path: '/user/{id}',
	options: {
		auth: {
			scope: ['admin']
		},
		tags: ['api'],
		validate: {
			params: Joi.object({
				id: Joi.number().integer().required().example(1).description('ID of the user to update')
			}),
			payload: Joi.object({
				firstName: Joi.string().min(3).example('John').description('Firstname of the user'),
				lastName: Joi.string().min(3).example('Doe').description('Lastname of the user'),
				password: Joi.string().min(8).example('password123').description('Password of the user (min 8 characters)'),
				mail: Joi.string().email().example('john.doe@example.com').description('Email of the user'),
				username: Joi.string().min(3).example('johndoe').description('Username of the user')
			})
		}
	},
	handler: async (request, h) => {
		const { userService } = request.services();

		return await userService.update(request.params.id, request.payload);
	}
};
