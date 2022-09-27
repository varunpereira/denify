import db from '@src/prov/db'
import orderModel from '@src/prot/order'

db()

export async function post({ request }) {
	var { orderId } = await request.json()
	var order = await orderModel.findOne({
		_id: orderId,
	})
	return {
		body: {
			order,
		},
	}
}
