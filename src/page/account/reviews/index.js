import db from '@src/prov/db'
import reviewModel from '@src/prot/review'

db()

export async function post({ request }) {
	var { email } = await request.json()
	var reviews = await reviewModel.find({
		email,
	})
	return {
		body: {
			reviews,
		},
	}
}
