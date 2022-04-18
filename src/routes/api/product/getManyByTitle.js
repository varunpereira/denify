import db from '@src/utils/db';
import productModel from '@src/models/productModel';

db();

export async function post({ request }) {
	var {searchTerm} = await request.json();
	var products = await productModel.find({
		title: { $regex: searchTerm, $options: 'i' }
	});
	return {
		body: {
			products
		}
	};
}
