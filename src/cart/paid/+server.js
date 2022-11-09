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
	var { email, checkoutSessionId } = await request.json()

	var cartPaid = await orderModel.findOne({
		email: email,
		current: false,
		checkoutSessionId: checkoutSessionId,
	})
	if (cartPaid == null) {
		// update cart to paid + add csId
		varcartPay = await orderModel.updateOne(
			{ email: email, current: true },
			{
				current: false,
				checkoutSessionId: checkoutSessionId,
			},
		)
		// create new cart
		varcartNew = await new orderModel({
			email: email,
			current: true,
		}).save()
		return json({
			cartPaid: false,
		})
	}
	return json({
		cartPaid: true,
	})
}
