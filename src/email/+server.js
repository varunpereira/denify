import { db } from '@src/prov/db/connect.js'
import bcryptjs from 'bcryptjs'
import { PUBLIC_apiSecret } from '$env/static/public'
import userModel from '@src/prov/model/user.js'
import sgMail from '@sendgrid/mail'
import { json } from '@sveltejs/kit'
import { sendgridApiKey } from '$env/static/private'

db()
sgMail.setApiKey(sendgridApiKey)

export var POST = async ({ request }) => {
	var { $apiSecret, formData } = await request.json()
	// api security
	var isMatch = bcryptjs.compareSync(PUBLIC_apiSecret, $apiSecret)
	if (isMatch == false) {
		return json({
			authorised: false,
		})
	}

	var msg = {
		to: 'laughlifelong@gmail.com',
		from: 'laughlifelong@gmail.com',
		subject: 'Sending with SendGrid is Fun',
		text: 'and easy to do anywhere, even with Node.js',
		html: '<strong>and easy to do anywhere, even with Node.js</strong>',
	}
	sgMail
		.send(msg)
		.then(() => {
			console.log('Email sent')
		})
		.catch(function (error) {
			console.error(error)
		})
	return json({})
}
