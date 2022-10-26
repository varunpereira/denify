import { db } from '@src/prov/db/connect.js'
import userModel from '@src/prov/model/user.js'
import { json } from '@sveltejs/kit'

db()

export var POST = async ({ request }) => {
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
