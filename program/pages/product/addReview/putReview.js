import db from '@program/provs/db';
import reviewModel from '@program/prots/review';

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
