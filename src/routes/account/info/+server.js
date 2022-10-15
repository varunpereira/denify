import { db } from '@src/routes/db/connect.js'
import userModel from '@src/routes/model/user.js'
import { json } from '@sveltejs/kit'


db()

export var POST = async ({ request }) => {
	var { email } = await request.json()
	var user = await userModel.findOne({
		email,
	})
	return json( {
			user,
		},
	)
}
