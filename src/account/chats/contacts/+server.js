import { db } from '@src/prov/db/connect.js'
import { domain, devDomain } from '$env/static/private'


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

	var { email } = await request.json()

	var error = null
	var user = await userModel.findOne({
		email,
	})
	if (user == null) {
		error = 'User does not exist.'
	}
	return json({
		error,
		user,
	})
}
