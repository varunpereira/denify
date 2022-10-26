import { db } from '@src/prov/db/connect.js'
import orderModel from '@src/prov/model/order.js'
import { json } from '@sveltejs/kit'


db()

export var POST = async ({ request }) => {
	var { email } = await request.json()
	var orders = await orderModel.find({
		email,
		current: false,
	})
	return json( {
			orders,
		},
	)
}
