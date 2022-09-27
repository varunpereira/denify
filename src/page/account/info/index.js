import db from '@src/prov/db'
import userModel from '@src/prot/user'

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
