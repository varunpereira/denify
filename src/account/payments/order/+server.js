import { db } from '@src/prov/db/connect.js'
import bcryptjs from 'bcryptjs'
import { PUBLIC_apiSecret } from '$env/static/public'
import orderModel from '@src/prov/model/order.js'
import { json } from '@sveltejs/kit'


db()

export var POST = async ({ request }) => {
	var { $apiSecret, orderId } = await request.json()
// api security
	var isMatch = bcryptjs.compareSync(PUBLIC_apiSecret, $apiSecret)
	if (isMatch == false) {
		return json({
			authorised: false,
		})
	}

	var order = await orderModel.findOne({
		_id: orderId,
	})
	return json( {
			order,
		},
	)
}
