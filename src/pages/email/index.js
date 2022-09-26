import db from '@src/provs/db'
import userModel from '@src/prots/user'
import sgMail from '@sendgrid/mail'

db()
sgMail.setApiKey(import.meta.env.VITE_sendgridApiKey)

export async function post({ request }) {
	var formValues = await request.json()
	var msg = {
		to: 'laughlifelong@gmail.com',
		from: 'laughlifelong@gmail.com',
		subject: 'Sending with SendGrid is Fun',
		text: 'and easy to do anywhere, even with Node.js',
		html: '<strong>and easy to do anywhere, even with Node.js</strong>',
	}
	sgMail
		.send(msg)
		.then(function () {
			console.log('Email sent')
		})
		.catch(function (error) {
			console.error(error)
		})
	return {
		body: {},
	}
}
