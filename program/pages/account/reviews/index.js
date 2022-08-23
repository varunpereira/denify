import db from '@program/provs/db';
import reviewModel from '@program/prots/review';

db();

export async function post({ request }) {
	var { email } = await request.json();
	var reviews = await reviewModel.find({
		email
	});
	return {
		body: {
			reviews
		}
	};
}
