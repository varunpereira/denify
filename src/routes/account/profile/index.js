import db from '@src/utils/db';
import productModel from '@src/models/productModel';

db();

export async function post({ request }) {
	var { email } = await request.json();
	var products = await productModel.find({
		email
	});
	return {
		body: {
			products
		}
	};
}
