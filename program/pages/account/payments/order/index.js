import db from '@program/provs/db';
import orderModel from '@program/prots/order';

db();

export async function post({ request }) {
	var { orderId } = await request.json();
	var order = await orderModel.findOne({
		_id: orderId
	});
	return {
		body: {
			order
		}
	};
}
