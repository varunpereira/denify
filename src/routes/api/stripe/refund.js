import Stripe from 'stripe';
import orderModel from '@src/models/orderModel';

var stripe = new Stripe(import.meta.env.VITE_stripeSecretKey, {
	apiVersion: '2020-08-27'
});

export async function post({ request }) {
	var { email, checkoutSessionId } = await request.json();
	try {
		var checkout_session = await stripe.checkout.sessions.retrieve(checkoutSessionId);
		var refund = await stripe.refunds.create({
			payment_intent: String(checkout_session.payment_intent)
		});
		var updateCart = await orderModel.updateOne(
			{ checkoutSessionId, current: false },
			{
				$set: {
					refunded: true
				}
			}
		);
		var orders = await orderModel.find({
			email,
			current: false
		});
		return {
			body: {
				orders
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
