'use strict';

const { Service } = require('@hapipal/schmervice');
const Jwt = require('@hapi/jwt');
const Encryption = require('@hugoheml/iut-encrypt');

module.exports = class UserService extends Service {
	async create(user) {
		const { User } = this.server.models();
		const { mailService } = this.server.services();

		const hashedPassword = await Encryption.sha1(user.password);
		const userWithHashedPassword = {
			...user,
			password: hashedPassword
		};

		const createdUser = await User.query().insertAndFetch(userWithHashedPassword);

		await mailService.sendWelcomeMail(createdUser);

		return createdUser;
	}

	getAll() {
		const { User } = this.server.models();

		return User.query();
	}

	delete(userId) {
		const { User } = this.server.models();

		return User.query().deleteById(userId);
	}

	async update(userId, user) {
		const { User } = this.server.models();

		if (user.password) {
			user.password = await Encryption.sha1(user.password);
		}

		return User.query().patchAndFetchById(userId, user);
	}

	findByMail(mail) {
		const { User } = this.server.models();

		return User.query().findOne({ mail });
	}

	async verifyPassword(user, password) {
		return Encryption.compareSha1(password, user.password);
	}

	async generateAuthToken(user) {
		const token = Jwt.token.generate(
			{
				aud: 'urn:audience:iut',
				iss: 'urn:issuer:iut',
				userId: user.id,
				username: user.username,
				mail: user.mail,
				firstName: user.firstName,
				lastName: user.lastName,
				scope: user.scope
			},
			{
				key: process.env.JWT_SECRET_KEY,
				algorithm: 'HS512'
			},
			{
				ttlSec: 14400 // 4 hours
			}
		);

		return token;
	}
};
