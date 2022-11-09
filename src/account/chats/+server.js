import { db } from '@src/prov/db/connect.js'
import chatModel from '@src/prov/model/chat.js'
import { json } from '@sveltejs/kit'
import bcryptjs from 'bcryptjs'
import { PUBLIC_apiSecret } from '$env/static/public'

db()

export var POST = async ({ request }) => {
	var { $apiSecret, email, recipEmail } = await request.json()
// api security
	var isMatch = bcryptjs.compareSync(PUBLIC_apiSecret, $apiSecret)
	if (isMatch == false) {
		return json({
			authorised: false,
		})
	}

	var email1 = email
	var email2 = recipEmail
	var messages = []
	try {
		var message1 = await chatModel.findOne({
			email1: email1,
			email2: email2,
		})
		var message2 = await chatModel.findOne({
			email1: email2,
			email2: email1,
		})
		if (message1 == null && message2 == null) {
			return json({
				error: 'Link not accessible.',
			})
		}
		if (message1 == null) {
			messages = message2.messages
		} else {
			messages = message1.messages
		}
		return json({
			messages: messages.reverse(),
		})
	} catch (error) {}
}
