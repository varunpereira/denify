import db from '@src/routes/db/connect.js'
import chatModel from '@src/routes/model/chat.js'
import userModel from '@src/routes/model/user.js'
import { json } from '@sveltejs/kit'

db()

export async function POST({ request }) {
	var { email, recipEmail } = await request.json()
	var find = await userModel.findOne({
		email,
		contacts: { $all: [recipEmail] },
	})
	// accepts contact req automatically
	if (find == null) {
		var update1 = await userModel.updateOne(
			{
				email: email,
			},
			{
				$push: {
					contacts: recipEmail,
				},
			},
		)
		var update2 = await userModel.updateOne(
			{
				email: recipEmail,
			},
			{
				$push: {
					contacts: email,
				},
			},
		)
		var createChat = await new chatModel({
			email1: email,
			email2: recipEmail,
		}).save()
	}
	return json({})
}
