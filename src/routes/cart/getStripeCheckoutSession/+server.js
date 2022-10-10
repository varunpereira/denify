import Stripe from 'stripe'
import { json } from '@sveltejs/kit'

var stripe = new Stripe(import.meta.env.VITE_stripeSecretKey, {
	apiVersion: '2020-08-27',
})

export async function POST({ request }) {
	var { orderId, items } = await request.json()
	try {
		var session = await stripe.checkout.sessions.create({
			mode: 'payment',
			payment_method_types: ['card'],
			line_items: items ?? [],
			success_url: `${
				import.meta.env.VITE_domain
			}/cart/paid?orderId=${orderId}&checkoutSessionId={CHECKOUT_SESSION_ID}`,
			cancel_url: `${import.meta.env.VITE_domain}/cart`,
		})
		return json({
			
				session,
			},
		)
	} catch (error) {
		return json({
			
				message: error.message,
			},
		)
	}
}
