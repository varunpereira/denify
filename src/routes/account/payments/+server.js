import db from '@src/routes/db/connect.js'
import orderModel from '@src/routes/model/order.js'
import { json } from '@sveltejs/kit'


db()

export async function POST({ request }) {
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