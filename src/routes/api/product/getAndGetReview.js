import db from '@src/utils/db';
import productModel from '@src/models/productModel';
import reviewModel from '@src/models/reviewModel';

db();

export async function post({ request }) {
	try {
		var { productId } = await request.json();
		var product = await productModel.findOne({ _id: productId });
		if (product === null) {
			return {
				body: {
					error: 'Products do not exist.'
				}
			};
		}
		let reviews = await reviewModel.find({
			productId: productId
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
