'use strict';

const { Service } = require('@hapipal/schmervice');
const { Parser } = require('json2csv');

module.exports = class MovieExportService extends Service {

	async requestExport(user) {

		const { mailService } = this.server.services();
		const { Movie } = this.server.models();

		const movies = await Movie.query();

		const fields = ['id', 'title', 'description', 'releaseDate', 'director', 'createdAt', 'updatedAt'];
		const parser = new Parser({ fields });
		const csv = parser.parse(movies);

		await mailService.sendMovieExportMail(user, csv);

		return { message: 'Export CSV sent by email.' };
	}
};
