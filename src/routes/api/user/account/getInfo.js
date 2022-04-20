import db from '@src/utils/db';
import userModel from '@src/models/userModel';

db();

export async function post({ request }) {
	var { email } = await request.json();
	var user = await userModel.findOne({
		email
	});
	return {
		body: {
			user
		}
	};
}
