import db from '@src/utils/db';
import userModel from '@src/models/user';

db();

export async function post({ request }) {
	var { email } = await request.json();
	var error = null;
	var user = await userModel.findOne({
		email
	});
	if (user == null) {
		error = 'User does not exist.';
	}
	return {
		body: {
			error,
			user
		}
	};
}
