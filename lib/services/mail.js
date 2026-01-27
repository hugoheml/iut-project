'use strict';

const { Service } = require('@hapipal/schmervice');
const Nodemailer = require('nodemailer');

module.exports = class MailService extends Service {
	constructor (server, options) {
		super(server, options);

		this.transporter = Nodemailer.createTransport({
			host: process.env.MAIL_HOST,
			port: process.env.MAIL_PORT,
			secure: process.env.MAIL_SECURE === 'true',
			auth: {
				user: process.env.MAIL_USER,
				pass: process.env.MAIL_PASSWORD
			}
		});
	}

	sendMail(to, subject, html, attachments = []) {
		const mailOptions = {
			from: process.env.MAIL_FROM || process.env.MAIL_USER,
			to,
			subject,
			html,
			attachments
		};

		return this.transporter.sendMail(mailOptions);
	}

	sendWelcomeMail(user) {
		const subject = 'Bienvenue sur notre plateforme !';
		const html = `
			<h1>Bienvenue ${user.firstName} ${user.lastName} !</h1>
			<p>Votre compte a été créé avec succès.</p>
			<p>Votre nom d'utilisateur est : <strong>${user.username}</strong></p>
			<p>Vous pouvez maintenant vous connecter avec votre adresse email : <strong>${user.mail}</strong></p>
			<br>
			<p>Cordialement,</p>
			<p>L'équipe</p>
		`;

		return this.sendMail(user.mail, subject, html);
	}

	sendNewMovieMail(user, movie) {
		const subject = 'Nouveau film disponible !';
		const html = `
			<h1>Bonjour ${user.firstName} ${user.lastName} !</h1>
			<p>Un nouveau film vient d'être ajouté à notre catalogue :</p>
			<h2>${movie.title}</h2>
			<p><strong>Réalisateur :</strong> ${movie.director}</p>
			<p><strong>Date de sortie :</strong> ${new Date(movie.releaseDate).toLocaleDateString('fr-FR')}</p>
			<p><strong>Description :</strong> ${movie.description}</p>
			<br>
			<p>Cordialement,</p>
			<p>L'équipe</p>
		`;

		return this.sendMail(user.mail, subject, html);
	}

	sendMovieUpdatedMail(user, movie) {
		const subject = `Le film "${movie.title}" a été mis à jour !`;
		const html = `
			<h1>Bonjour ${user.firstName} ${user.lastName} !</h1>
			<p>Un film de vos favoris vient d'être mis à jour :</p>
			<h2>${movie.title}</h2>
			<p><strong>Réalisateur :</strong> ${movie.director}</p>
			<p><strong>Date de sortie :</strong> ${new Date(movie.releaseDate).toLocaleDateString('fr-FR')}</p>
			<p><strong>Description :</strong> ${movie.description}</p>
			<br>
			<p>Cordialement,</p>
			<p>L'équipe</p>
		`;

		return this.sendMail(user.mail, subject, html);
	}

	sendMovieExportMail(user, csvContent) {
		const subject = 'Export des films';
		const html = `
			<h1>Bonjour ${user.firstName} ${user.lastName} !</h1>
			<p>Veuillez trouver ci-joint l'export CSV de l'ensemble des films.</p>
			<br>
			<p>Cordialement,</p>
			<p>L'équipe</p>
		`;

		const attachments = [
			{
				filename: `movies-export-${new Date().toISOString().split('T')[0]}.csv`,
				content: csvContent,
				contentType: 'text/csv'
			}
		];

		return this.sendMail(user.mail, subject, html, attachments);
	}
};
