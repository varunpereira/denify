import { db } from '@src/prov/db/connect.js'
import bcryptjs from 'bcryptjs'
import { PUBLIC_apiSecret } from '$env/static/public'
import chatModel from '@src/prov/model/chat.js'
import { json } from '@sveltejs/kit'

db()

export var POST = async ({ request }) => {
	var { $apiSecret, email, recipEmail, message } = await request.json()
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
