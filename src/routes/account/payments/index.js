import db from '@src/utils/db';
import orderModel from '@src/models/orderModel';

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
