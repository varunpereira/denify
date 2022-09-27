import db from '@src/prov/db'
import orderModel from '@src/prot/order'

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
