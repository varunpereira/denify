import db from '@src/provs/db'
import userModel from '@src/prots/user'

db()

export async function post({ request }) {
	var { email } = await request.json()
	var user = await userModel.findOne({
		email,
	})
	return {
		body: {
			user,
		},
	}
}
