import db from '@src/provs/db';
import productModel from '@src/prots/product';

db();

export async function post({ request }) {
	var { searchTerm } = await request.json();
	var products = await productModel.find({
		title: { $regex: searchTerm, $options: 'i' },
		approved: 'true'
	});
	return {
		body: {
			products
		}
	};
}
