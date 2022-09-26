import db from '@src/provs/db'
import orderModel from '@src/prots/order'

db()

export async function post({ request }) {
	var { email } = await request.json()
	var orders = await orderModel.find({
		email,
		current: false,
	})
	return {
		body: {
			orders,
		},
	}
}
