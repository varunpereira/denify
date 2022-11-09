import { db } from '@src/prov/db/connect.js'
import { domain, devDomain } from '$env/static/private'
import chatModel from '@src/prov/model/chat.js'
import { json } from '@sveltejs/kit'


db()

export var POST = async ({ request }) => {
	// cors
	if (request.url != domain) {
		
	}

	var { email, recipEmail } = await request.json()

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
