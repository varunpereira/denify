import db from '@src/routes/db/connect.js'
import chatModel from '@src/routes/model/chat.js'
import { json } from '@sveltejs/kit'

db()

export async function POST({ request }) {
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
