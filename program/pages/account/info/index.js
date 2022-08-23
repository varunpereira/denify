import db from '@program/provs/db';
import userModel from '@program/prots/user';

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
