import { db } from '@src/prov/db/connect.js'
import { domain, devDomain } from '$env/static/private'


import userModel from '@src/prov/model/user.js'
import { json } from '@sveltejs/kit'


db()

export var POST = async ({ request }) => {
	// cors
	if (request.url != domain) {
		
	}
	var { email } = await request.json()


	var user = await userModel.findOne({
		email,
	})
	return json( {
			user,
		},
	)
}
