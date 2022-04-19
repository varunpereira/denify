import db from '@src/utils/db';
import orderModel from '@src/models/orderModel';

db();

export async function post({ request }) {
	var { email } = await request.json();
    console.log(email )
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
