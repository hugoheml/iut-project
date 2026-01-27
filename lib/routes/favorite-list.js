'use strict';

module.exports = {
	method: 'get',
	path: '/favorites',
	options: {
		auth: {
			scope: ['user', 'admin']
		},
		tags: ['api']
	},
	handler: async (request, h) => {

		const { favoriteService } = request.services();
		const userId = request.auth.credentials.userId;

		return await favoriteService.getByUser(userId);
	}
};
