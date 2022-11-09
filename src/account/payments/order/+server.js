import { db } from '@src/prov/db/connect.js'
import { domain, devDomain } from '$env/static/private'

import orderModel from '@src/prov/model/order.js'
import { json } from '@sveltejs/kit'

db()

export var POST = async ({ request }) => {
	// cors
	if (request.url != domain) {
		return json({
			authorised: false,
		})
	}
	var { orderId } = await request.json()

	var order = await orderModel.findOne({
		_id: orderId,
	})
	return json({
		order,
	})
}
