import db from '@program/provs/db';
import orderModel from '@program/prots/order';

db();

export async function post({ request }) {
	var { email } = await request.json();
	var orders = await orderModel.find({
		email,
		current: false
	});
	return {
		body: {
			orders
		}
	};
}
