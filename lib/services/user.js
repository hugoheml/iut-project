'use strict';

const { Service } = require('@hapipal/schmervice');
const Encryption = require('@hugoheml/iut-encrypt');

module.exports = class UserService extends Service {
	async create(user) {
		const { User } = this.server.models();

		const hashedPassword = await Encryption.sha1(user.password);
		const userWithHashedPassword = {
			...user,
			password: hashedPassword
		};

		return User.query().insertAndFetch(userWithHashedPassword);
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
};
