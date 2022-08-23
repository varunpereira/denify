import db from '@src/provs/db';
import productModel from '@src/prots/product';

db();

export async function post({ request }) {
	try {
		var { productId } = await request.json();
		var product = await productModel.findOne({
			_id: productId
		});
		return {
			body: {
				product
			}
		};
	} catch (error) {
		return {
			body: {
				error: error.message
			}
		};
	}
}
