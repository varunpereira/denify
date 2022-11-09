import { db } from '@src/prov/db/connect.js'
import bcryptjs from 'bcryptjs'
import { PUBLIC_apiSecret } from '$env/static/public'
import reviewModel from '@src/prov/model/review.js'
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

	var reviews = await reviewModel.find({
		email,
	})
	return json({
			reviews,
		},
	)
}
