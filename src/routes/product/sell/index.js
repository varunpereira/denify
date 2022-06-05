import db from '@src/utils/db';
import productModel from '@src/models/productModel';

db();

export async function post({ request }) {
	try {
		var formData = await request.json();
		var addProduct = await new productModel(formData).save();
		return {
			body: {
				success: true
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
