'use strict';

module.exports = {
	method: 'get',
	path: '/movies',
	options: {
		auth: {
			scope: ['user', 'admin']
		},
		tags: ['api']
	},
	handler: async (request, h) => {

		const { movieService } = request.services();

		return await movieService.getAll();
	}
};
