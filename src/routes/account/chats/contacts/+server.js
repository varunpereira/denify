import db from '@src/routes/db/connect.js'
import userModel from '@src/routes/model/user.js'
import { json } from '@sveltejs/kit'

db()

export async function POST({ request }) {
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
