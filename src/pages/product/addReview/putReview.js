import db from '@src/provs/db';
import reviewModel from '@src/prots/review';

db();

export async function post({ request }) {
	try {
		var formValues = await request.json();
		varsave = await new reviewModel(formValues).save()
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
