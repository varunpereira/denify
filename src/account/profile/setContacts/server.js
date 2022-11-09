import { db } from '@src/prov/db/connect.js'
import bcryptjs from 'bcryptjs'
import { PUBLIC_apiSecret } from '$env/static/public'
import chatModel from '@src/prov/model/chat.js'
import userModel from '@src/prov/model/user.js'
import { json } from '@sveltejs/kit'

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
