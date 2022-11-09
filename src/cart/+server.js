import { db } from '@src/prov/db/connect.js'
import { domain, devDomain } from '$env/static/private'

import orderModel from '@src/prov/model/order.js'
import { json } from '@sveltejs/kit'

db()

export var POST = async ({ request }) => {
	// cors
	if (request.url != domain && request.url != devDomain) {
		return json({
			authorised: false,
		})
	}
	var { email } = await request.json()

	var cart = await orderModel.findOne({
		email: email,
		current: true,
	})
	return json({
		cart,
	})
}
