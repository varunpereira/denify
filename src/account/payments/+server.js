import { db } from '@src/prov/db/connect.js'
import { domain, devDomain } from '$env/static/private'

import orderModel from '@src/prov/model/order.js'
import { json } from '@sveltejs/kit'

db()

export var POST = async ({ request }) => {
	// cors
	if (request.url != domain) {
		return json({
			authorised: false, domain: request.url,
		})
	}
	var { email } = await request.json()

	var orders = await orderModel.find({
		email,
		current: false,
	})
	return json({
		orders,
	})
}
