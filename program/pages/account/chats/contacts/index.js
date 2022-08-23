import db from '@program/provs/db';
import userModel from '@program/prots/user';

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
