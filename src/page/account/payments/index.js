import db from '@src/prov/db'
import orderModel from '@src/prot/order'

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
