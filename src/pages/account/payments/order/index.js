import db from '@src/provs/db'
import orderModel from '@src/prots/order'

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
