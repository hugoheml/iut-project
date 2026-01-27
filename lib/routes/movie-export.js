'use strict';

module.exports = {
	method: 'post',
	path: '/movies/export',
	options: {
		auth: {
			scope: ['admin']
		},
		tags: ['api']
	},
	handler: async (request, h) => {

		const { movieExportService } = request.services();
		const user = request.auth.credentials;

		return await movieExportService.requestExport(user);
	}
};
