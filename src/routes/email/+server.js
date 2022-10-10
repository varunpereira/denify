import db from '@src/routes/db/connect.js'
import userModel from '@src/routes/model/user.js'
import sgMail from '@sendgrid/mail'
import { json } from '@sveltejs/kit'
import { sendgridApiKey } from '$env/static/private'

db()
sgMail.setApiKey(sendgridApiKey)

export async function POST({ request }) {
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
	return json({
		},
	)
}
