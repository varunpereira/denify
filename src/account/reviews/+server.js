import { db } from '@src/prov/db/connect.js'
import reviewModel from '@src/prov/model/review.js'
import { json } from '@sveltejs/kit'


db()

export var POST = async ({ request }) => {
	var { email } = await request.json()
	var reviews = await reviewModel.find({
		email,
	})
	return json({
			reviews,
		},
	)
}
