import db from '@src/utils/db';
import chatModel from '@src/models/chatModel';

db();

export async function post({ request }) {
	var { email, recipEmail } = await request.json();
	var email1 = email;
	var email2 = recipEmail;
	var messages = [];
	try {
		var message1 = await chatModel.findOne({
			email1: email1,
			email2: email2
		});
		var message2 = await chatModel.findOne({
			email1: email2,
			email2: email1
		});
		if (message1 === null && message2 === null) {
			return {
				body: {
					error: "Link not accessible."
				}
			};
		}
		if (message1 === null) {
			messages = message2.messages;
		} else {
			messages = message1.messages;
		}
		return {
			body: {
				messages
			}
		};
	} catch (error) {}
}
