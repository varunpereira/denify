import Stripe from 'stripe';

let stripe = new Stripe(import.meta.env.VITE_stripeSecretKey, {
	apiVersion: '2020-08-27'
});

export async function post({ request }) {
	var { orderId, items } = await request.json();
	try {
		var session = await stripe.checkout.sessions.create({
			mode: 'payment',
			payment_method_types: ['card'],
			line_items: req?.body?.items ?? [],
			success_url: `${req.headers.origin}/cart/paymentSuccess?orderId=${orderId}&checkoutSessionId={CHECKOUT_SESSION_ID}`,
			cancel_url: `${req.headers.origin}/cart`
		});
		return {
			body: {
				session
			}
		};
	} catch (error) {
		return {
			body: {
				message: error.message
			}
		};
	}
}
