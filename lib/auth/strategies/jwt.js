'use strict';

const { JWT_TOKEN_KEY } = require('../../../config');

module.exports = {
	scheme: 'jwt',
	options: {
		keys: JWT_TOKEN_KEY,
		verify: {
			aud: 'urn:audience:iut',
			iss: 'urn:issuer:iut',
			sub: false,
			nbf: true,
			exp: true,
			maxAgeSec: 14400, // 4 hours
			timeSkewSec: 15
		},
		validate: async (artifacts, request, h) => {

			return {
				isValid: true,
				credentials: artifacts.decoded.payload
			};
		}
	}
};
