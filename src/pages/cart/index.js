import db from '@src/provs/db'
import orderModel from '@src/prots/order'

db()

export async function post({ request }) {
	var { email } = await request.json()
	var cart = await orderModel.findOne({
		email: email,
		current: true,
	})
	return {
		body: {
			cart,
		},
	}
}
