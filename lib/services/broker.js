'use strict';

const { Service } = require('@hapipal/schmervice');

module.exports = class BrokerService extends Service {
	constructor (server, options) {
		super(server, options);

		this.handlers = {};

		this.register('movie.export', async (payload) => {
			const { mailService } = this.server.services();

			if (!payload || !payload.user || !payload.csv) {
				return;
			}

			await mailService.sendMovieExportMail(payload.user, payload.csv);
		});
	}

	register(topic, handler) {
		this.handlers[topic] = handler;
	}

	async publish(topic, payload) {
		const handler = this.handlers[topic];

		if (!handler) {
			return;
		}

		setImmediate(() => {
			try {
				handler(payload).catch((err) => this.server.log(['error', 'broker'], err));
			}
			catch (err) {
				this.server.log(['error', 'broker'], err);
			}
		});
	}
};
