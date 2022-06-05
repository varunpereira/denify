import db from '@src/utils/db';
import reviewModel from '@src/models/reviewModel';

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
