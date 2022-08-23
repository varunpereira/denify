import db from '@program/provs/db';
import orderModel from '@program/prots/order';

db();

export async function post({ request }) {
	var { email } = await request.json();
	var cart = await orderModel.findOne({
		email: email,
		current: true
	});
	return {
		body: {
			cart
		}
	};
}
