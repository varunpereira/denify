import db from '@src/provs/db';
import productModel from '@src/prots/product';
import reviewModel from '@src/prots/review';

db();

export async function post({ request }) {
	try {
		var { productId } = await request.json();
		var product = await productModel.findOne({ _id: productId });
		if (product == null) {
			return {
				body: {
					error: 'Product do not exist.'
				}
			};
		}
		var reviews = await reviewModel.find({
			productId
		});
		return {
			body: {
				product,
				reviews
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
