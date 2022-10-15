import { db } from '@src/routes/db/connect.js'
import orderModel from '@src/routes/model/order.js'
import { json } from '@sveltejs/kit'

db()

export var POST = async ({ request }) => {
	var { email } = await request.json()
	var cart = await orderModel.findOne({
		email: email,
		current: true,
	})
	return json({
			cart,
		},
	)
}
