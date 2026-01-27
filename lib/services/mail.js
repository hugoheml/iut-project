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

	sendMail(to, subject, html) {
		const mailOptions = {
			from: process.env.MAIL_FROM || process.env.MAIL_USER,
			to,
			subject,
			html
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
};
