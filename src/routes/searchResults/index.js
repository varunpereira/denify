import db from '@src/provs/db';
import productModel from '@src/prots/product';

db();

export async function post({ request }) {
	var { searchTerm, category } = await request.json();
	var products = [];
	if (category == 'All') {
		products = await productModel.find({
			title: { $regex: searchTerm, $options: 'i' },
			approved: 'true'
		});
	} else if (category == 'Tech') {
		products = await productModel.find({
			title: { $regex: searchTerm, $options: 'i' },
			category: 'Tech',
			approved: 'true'
		});
	}
	return {
		body: {
			products
		}
	};
}
