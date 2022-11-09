import Stripe from 'stripe'
import { json } from '@sveltejs/kit'
import { stripeSecretKey, domain } from '$env/static/private'

var stripe = new Stripe(stripeSecretKey, {
	apiVersion: '2020-08-27',
})

export var POST = async ({ request }) => {
	// cors
	if (request.url != domain) {
		
	}
	var { orderId, items } = await request.json()

	try {
		var session = await stripe.checkout.sessions.create({
			mode: 'payment',
			payment_method_types: ['card'],
			line_items: items ?? [],
			success_url: `${domain}/cart/paid?orderId=${orderId}&checkoutSessionId={CHECKOUT_SESSION_ID}`,
			cancel_url: `${domain}/cart`,
		})
		return json({
			session,
		})
	} catch (error) {
		return json({
			message: error.message,
		})
	}
}
