import db from '@src/utils/db';
import orderModel from '@src/models/orderModel';

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
