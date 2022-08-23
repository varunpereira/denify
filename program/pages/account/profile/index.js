import db from '@program/provs/db';
import productModel from '@program/prots/product';

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
