import db from '@src/utils/db';
import chatModel from '@src/models/chatModel';

db();

export async function post({ request }) {
	var { email, recipEmail, newMessage } = await request.json();
	console.log({ email, recipEmail, newMessage });
	var email1 = email;
	var email2 = recipEmail;
	var messages = [];
	var update1 = await chatModel.findOneAndUpdate(
		{
			email1: email1,
			email2: email2
		},
		{
			$push: {
				messages: newMessage
			}
		},
		{ new: true }
	);
	messages = update1.messages;
	if (update1 === null) {
		var update2 = await chatModel.findOneAndUpdate(
			{
				email1: email2,
				email2: email1
			},
			{
				$push: {
					messages: newMessage
				}
			},
			{ new: true }
		);
		messages = update2.messages;
		console.log(JSON.stringify(messages));

		return {
			body: {
				messages
			}
		};
	}
}
