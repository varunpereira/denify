import Stripe from 'stripe'
import orderModel from '@src/routes/model/order.js'
import { json } from '@sveltejs/kit'
import { stripeSecretKey } from '$env/static/private'

var stripe = new Stripe(stripeSecretKey, {
	apiVersion: '2020-08-27',
})

export async function POST({ request }) {
	var { email, checkoutSessionId } = await request.json()
	try {
		var checkout_session = await stripe.checkout.sessions.retrieve(checkoutSessionId)
		var refund = await stripe.refunds.create({
			payment_intent: String(checkout_session.payment_intent),
		})
		var updateCart = await orderModel.updateOne(
			{ checkoutSessionId, current: false },
			{
				$set: {
					refunded: true,
				},
			},
		)
		var orders = await orderModel.find({
			email,
			current: false,
		})
		return json( {
				orders,
			},
		)
	} catch (error) {
		return json({
				message: error.message,
			},
		)
	}
}
