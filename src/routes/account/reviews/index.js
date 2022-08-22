import db from '@src/provs/db';
import reviewModel from '@src/prots/review';

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
