import { db } from '@src/prov/db/connect.js'
import userModel from '@src/prov/model/user.js'
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
