import { db } from '@src/prov/db/connect.js'
import orderModel from '@src/prov/model/order.js'
import { json } from '@sveltejs/kit'


db()

export var POST = async ({ request }) => {
	var { orderId } = await request.json()
	var order = await orderModel.findOne({
		_id: orderId,
	})
	return json( {
			order,
		},
	)
}
