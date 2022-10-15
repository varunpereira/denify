import db from '@src/routes/db/connect.js'
import chatModel from '@src/routes/model/chat.js'
import { json } from '@sveltejs/kit'

db()

export async function POST({ request }) {
	var { email, recipEmail, message } = await request.json()
	var email1 = email
	var email2 = recipEmail
	var messages = []
	var update1 = await chatModel.findOneAndUpdate(
		{
			email1: email1,
			email2: email2,
		},
		{
			$push: {
				messages: { [email]: message },
			},
		},
		{ new: true },
	)
	if (update1 == null) {
		var update2 = await chatModel.findOneAndUpdate(
			{
				email1: email2,
				email2: email1,
			},
			{
				$push: {
					messages: { [email]: message },
				},
			},
			{ new: true },
		)
		messages = update2.messages
	} else {
		messages = update1.messages
	}
	return json({
		messages: messages.reverse(),
	})
}
