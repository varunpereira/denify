import { db } from '@src/prov/db/connect.js'
import bcryptjs from 'bcryptjs'
import { PUBLIC_apiSecret } from '$env/static/public'
import userModel from '@src/prov/model/user.js'
import { json } from '@sveltejs/kit'


db()

export var POST = async ({ request }) => {
	var { $apiSecret, email } = await request.json()
// api security
	var isMatch = bcryptjs.compareSync(PUBLIC_apiSecret, $apiSecret)
	if (isMatch == false) {
		return json({
			authorised: false,
		})
	}

	var user = await userModel.findOne({
		email,
	})
	return json( {
			user,
		},
	)
}
