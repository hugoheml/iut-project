'use strict';

const Joi = require('joi');
const Boom = require('@hapi/boom');

module.exports = {
	method: 'post',
	path: '/user/login',
	options: {
		auth: false,
		tags: ['api'],
		validate: {
			payload: Joi.object({
				mail: Joi.string().required().email().example('john.doe@example.com').description('Email of the user'),
				password: Joi.string().required().min(8).example('password123').description('Password of the user')
			})
		}
	},
	handler: async (request, h) => {
		const { userService } = request.services();
		const { mail, password } = request.payload;

		const user = await userService.findByMail(mail);

		if (!user) {
			throw Boom.unauthorized('Invalid credentials');
		}

		const isValidPassword = await userService.verifyPassword(user, password);

		if (!isValidPassword) {
			throw Boom.unauthorized('Invalid credentials');
		}

		const token = await userService.generateAuthToken(user);

		return { login: 'successful', token };
	}
};
