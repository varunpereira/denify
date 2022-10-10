import db from '@src/routes/db/connect.js'
import orderModel from '@src/routes/model/order.js'
import { json } from '@sveltejs/kit'


db()

export async function POST({ request }) {
	var { orderId } = await request.json()
	var order = await orderModel.findOne({
		_id: orderId,
	})
	return json( {
			order,
		},
	)
}