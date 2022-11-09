import { db } from '@src/prov/db/connect.js'
import { domain, devDomain } from '$env/static/private'

import chatModel from '@src/prov/model/chat.js'
import userModel from '@src/prov/model/user.js'
import { json } from '@sveltejs/kit'

db()

export var POST = async ({ request }) => {
	// cors
	if (request.url != domain) {
		return json({
			authorised: false, domain: request.url,
		})
	}
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
