import db from '@src/provs/db';
import productModel from '@src/prots/product';

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
