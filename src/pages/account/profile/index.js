import db from '@src/provs/db';
import productModel from '@src/prots/product';

db();

export async function post({ request }) {
	var { email } = await request.json();
	var products = await productModel.find({
		email, approved: 'true'
	});
	return {
		body: {
			products
		}
	};
}
