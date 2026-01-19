'use strict';

module.exports = {
	method: 'get',
	path: '/user',
	options: {
		tags: ['api']
	},
	handler: async (request, h) => {
		const { User } = request.models();

		const users = await User.query().select();

		return users;
	}
};