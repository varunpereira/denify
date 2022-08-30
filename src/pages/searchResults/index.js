import db from '@src/provs/db';
import productModel from '@src/prots/product';

db();

export async function post({ request }) {
	var { searchTerm, category, pagination } = await request.json();
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
	var productsPerPage = 20;
	var lower = productsPerPage * (pagination - 1);
	var upper = productsPerPage * pagination + 1;
	products = products.slice(lower, upper);

	return {
		body: {
			products
		}
	};
}
