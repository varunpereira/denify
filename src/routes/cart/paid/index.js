import db from '@src/utils/db';
import orderModel from '@src/models/orderModel';

db();

export async function post({ request }) {
	var { email, checkoutSessionId } = await request.json();
	var cartPaid = await orderModel.findOne({
		email: email,
		current: false,
		checkoutSessionId: checkoutSessionId
	});
	if (cartPaid === null) {
		// update cart to paid + add csId
		let cartPay = await orderModel.updateOne(
			{ email: email, current: true },
			{
				current: false,
				checkoutSessionId: checkoutSessionId
			}
		);
		// create new cart
		let cartNew = await new orderModel({
			email: email,
			current: true
		}).save();
		return {
			body: {
				cartPaid: false
			}
		};
	}
	return {
		body: {
			cartPaid: true
		}
	};
}
