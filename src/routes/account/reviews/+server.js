import db from '@src/routes/db/connect.js'
import reviewModel from '@src/routes/model/review.js'
import { json } from '@sveltejs/kit'


db()

export async function POST({ request }) {
	var { email } = await request.json()
	var reviews = await reviewModel.find({
		email,
	})
	return json({
			reviews,
		},
	)
}
