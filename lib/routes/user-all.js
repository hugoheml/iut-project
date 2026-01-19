'use strict';

module.exports = {
	method: 'get',
	path: '/user',
	options: {
		tags: ['api']
	},
	handler: async (request, h) => {
		const { userService } = request.services();

		return await userService.getAll();
	}
};