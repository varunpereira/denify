import db from '@program/provs/db';
import productModel from '@program/prots/product';
import reviewModel from '@program/prots/review';

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
		return {
			body: {
				product,
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
