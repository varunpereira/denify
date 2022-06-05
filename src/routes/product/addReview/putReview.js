import db from '@src/utils/db';
import reviewModel from '@src/models/reviewModel';

db();

export async function post({ request }) {
	try {
		var formValues = await request.json();
		let save = await new reviewModel(formValues).save()
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
