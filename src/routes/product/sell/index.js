import db from '@src/utils/db';
import productModel from '@src/models/product';

db();

export async function post({ request }) {
	try {
		var formData = await request.json();
		formData['approved'] = 'pending';
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
